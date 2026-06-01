import z from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().positive(),
    DATABASE_URL: z.string()
})