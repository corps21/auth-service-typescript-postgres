import jwt, { type SignOptions, type VerifyOptions } from "jsonwebtoken"
import "dotenv/config"
import fs from "node:fs/promises"

export function generateToken<T extends Object>(payload:T, options?:SignOptions) {
    try {
        // const privateKey = await fs.readFile(process.env.PRIVATE_KEY_PATH!, "utf8")
        return jwt.sign(payload, process.env.JWT_PRIVATE_KEY!, options)
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error(String(error))
    }
}

export function verifyToken(token:string, options?: VerifyOptions) {
    try {
        // const publicKey = await fs.readFile(process.env.PUBLIC_KEY_PATH!, "utf8")
        return jwt.verify(token, process.env.JWT_PUBLIC_KEY!, options)
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error(String(error))
    }
}
