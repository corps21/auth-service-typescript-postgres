import jwt, { type SignOptions, type VerifyOptions } from "jsonwebtoken"
import "dotenv/config"

export function generateToken<T extends Object>(payload:T, options?:SignOptions) {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET!, options)
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error(String(error))
    }
}

export function verifyToken(token:string, options?: VerifyOptions) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!, options)
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error(String(error))
    }
}
