import z from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().positive(),
    DATABASE_URL: z.string(),
    JWT_ACCESS_TOKEN_EXPIRY: z.string(),
    JWT_REFRESH_TOKEN_EXPIRY: z.string(),
    DOMAIN: z.string(),
    PRIVATE_KEY_PATH: z.string(),
    PUBLIC_KEY_PATH: z.string()
})
