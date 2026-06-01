import z from "zod"

export const registerUserPayloadSchema = z.object({
    firstName: z.string().nonempty().nonoptional(),
    lastName: z.string().optional(),
    email: z.email().nonoptional(),
    password: z.string().min(8).nonoptional()
})

export type registerUserPayload = z.infer<typeof registerUserPayloadSchema>