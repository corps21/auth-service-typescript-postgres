
import { ApiError } from "../../common/utils/api.error.js";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import type { registerUserPayload, loginUserPayload } from "./model.js";
import { publicUserColumnsWithPasswordAndSalt } from "./utils/columns.js";

export class AuthService {
    async registerUser(payload: registerUserPayload) {

        const {firstName, lastName, email, password} = payload

        const [userAlreadyExists] = await db.select().from(userTable).where(eq(userTable.email, email))
        if(userAlreadyExists) throw ApiError.conflict("Email already exists")
        
        const salt = randomBytes(32).toString("hex")
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex")

        const [user] = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            salt,
            password: hashedPassword
        }).returning({id: userTable.id, firstName: userTable.firstName, lastName: userTable.lastName, email: userTable.email})

        if(!user) throw new ApiError("Something went wrong while signing user")

        return user
    }

    async loginUser(payload: loginUserPayload) {
        const {email, password} = payload
        const [user] = await db.select(publicUserColumnsWithPasswordAndSalt).from(userTable).where(eq(userTable.email, email))
        if(!user) throw ApiError.nonFound("User doesn't exists")

        const {password: userPassword, salt, ...safeUser} = user

        const hashedGivenPassword = createHmac("sha256", salt!).update(password).digest("hex")
        if(hashedGivenPassword !== userPassword) throw ApiError.unauthorized("User or password is incorrect")
        
        // generate token

        return safeUser;
    }
}
