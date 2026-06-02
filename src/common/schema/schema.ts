import z from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().positive(),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    JWT_ACCESS_TOKEN_EXPIRY: z.string(),
    JWT_REFRESH_TOKEN_EXPIRY: z.string()
})
