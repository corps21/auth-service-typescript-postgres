import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
  
    firstName: varchar("first_name", {length: 45}).notNull(),
    lastName: varchar("last_name", {length: 45}),
  
    email: varchar("email", {length: 322}).notNull().unique("Email already exists"),
    password: varchar("password", {length: 66}),
    salt: text("salt"),
    refreshTokenHash: text("refresh_token_hash"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()).notNull(),
})
