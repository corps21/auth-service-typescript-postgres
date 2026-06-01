import express from "express"
import type { Express } from "express"
import authRouter from "./auth/route.js"

export function createExpressServer():Express  {
    const app = express()

    // Middleware
    app.use(express.json())

    // Routes
    app.use("/api/v1/auth", authRouter)
    return app
}