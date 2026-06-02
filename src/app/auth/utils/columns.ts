import { userTable } from "../../../db/schema.js"

export const publicUserColumns = {
    id: userTable.id,
    firstName: userTable.firstName,
    lastName: userTable.lastName,
    email: userTable.email
}

export const publicUserColumnsWithPasswordAndSalt = Object.assign(
    { password: userTable.password, salt: userTable.salt },
    publicUserColumns
)
