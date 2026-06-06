
import { ApiError } from "../../common/utils/api.error.js";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import type { registerUserPayload, loginUserPayload, responseUser, serviceDiscovery } from "./model.js";
import { publicUserColumnsWithPasswordAndSalt, publicUserColumns } from "./utils/columns.js";
import { generateToken } from "../../common/utils/jwt.js";
import "dotenv/config"

export class AuthService {
    async registerUser(payload: registerUserPayload) {

        const { firstName, lastName, email, password } = payload

        const [userAlreadyExists] = await db.select().from(userTable).where(eq(userTable.email, email))
        if (userAlreadyExists) throw ApiError.conflict("Email already exists")

        const salt = randomBytes(32).toString("hex")
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex")

        const [user] = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            salt,
            password: hashedPassword
        }).returning({ id: userTable.id, firstName: userTable.firstName, lastName: userTable.lastName, email: userTable.email })

        if (!user) throw new ApiError("Something went wrong while signing user")

        return user
    }

    async loginUser(payload: loginUserPayload) {
        const { email, password } = payload
        const [user] = await db.select(publicUserColumnsWithPasswordAndSalt).from(userTable).where(eq(userTable.email, email))
        if (!user) throw ApiError.nonFound("User doesn't exists")

        const { password: userPassword, salt, ...safeUser } = user

        const hashedGivenPassword = createHmac("sha256", salt!).update(password).digest("hex")
        if (hashedGivenPassword !== userPassword) throw ApiError.unauthorized("User or password is incorrect")

        const accessToken = generateToken({
            id: safeUser.id,
            email: safeUser.email,
            firstName: safeUser.firstName,
            lastName: safeUser.lastName
            // @ts-ignore
        }, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY!, algorithm: "RS256" })
        
        const refreshToken = generateToken({
            id: safeUser.id
            // @ts-ignore
        }, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY!, algorithm: "RS256" })

        const hashedRefreshToken = createHmac("sha256", salt!).update(refreshToken).digest("hex")
        await db.update(userTable).set({ refreshTokenHash: hashedRefreshToken }).where(eq(userTable.id, safeUser.id))

        return { user: safeUser, accessToken, refreshToken }
    }

    async logoutUser(payload: responseUser) {
        const user = payload
        await db.update(userTable).set({ refreshTokenHash: null }).where(eq(userTable.id, user.id))
        return true;
    }

    async getUser(payload: responseUser) {
        const user = payload
        const [userFromDb] = await db.select(publicUserColumns).from(userTable).where(eq(userTable.id, user.id))
        if (!userFromDb) throw ApiError.nonFound("User doesn't exists")
        return userFromDb
    }

    serviceDiscovery(): serviceDiscovery {
        return {
            issuer: process.env.DOMAIN!,
            authorization_endpoint: `${process.env.DOMAIN}:${process.env.PORT}/api/v1/auth/log-in`,
            userinfo_endpoint: `${process.env.DOMAIN}:${process.env.PORT}/api/v1/auth/me`,
            jwks_uri: {
                alg: "RS256",
                n: process.env.JWT_PUBLIC_KEY!
            }
        }
    }
}
