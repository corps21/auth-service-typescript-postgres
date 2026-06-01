
import { ApiError } from "../../common/utils/api.error.js";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import type { registerUserPayload } from "./model.js";

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
}