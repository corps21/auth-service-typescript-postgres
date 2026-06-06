import z from "zod"

export const registerUserPayloadSchema = z.object({
    firstName: z.string().nonempty().nonoptional(),
    lastName: z.string().optional(),
    email: z.email().nonoptional(),
    password: z.string().min(8).nonoptional()
})

export type registerUserPayload = z.infer<typeof registerUserPayloadSchema>

export const loginUserPayloadSchema = z.object({
    email: z.email().nonoptional(),
    password: z.string().min(8).nonoptional()
})

export type loginUserPayload = z.infer<typeof loginUserPayloadSchema>

export const responseUserSchema = z.object({
    id: z.string().nonoptional(),
    firstName: z.string().nonoptional(),
    lastName: z.string().nonoptional(),
    email: z.string().nonoptional()
})

export type responseUser = z.infer<typeof responseUserSchema>

export const logoutUserPayloadSchema = z.object({
    user: responseUserSchema
})

export type logoutUserPayload = z.infer<typeof logoutUserPayloadSchema>

export const serviceDiscoverySchema = z.object({
    issuer: z.url().nonoptional(),
    authorization_endpoint: z.url().nonoptional(),
    userinfo_endpoint: z.url().nonoptional(),
    jwks_uri: z.string().nonoptional()
})

export type serviceDiscovery = z.infer<typeof serviceDiscoverySchema>