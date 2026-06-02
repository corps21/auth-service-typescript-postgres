import type { Request, Response } from "express";
import { loginUserPayloadSchema, registerUserPayloadSchema, logoutUserPayloadSchema, responseUserSchema, type responseUser } from "./model.js";
import { AuthService } from "./service.js";
import { ApiResponse } from "../../common/utils/api.response.js";
import { validateSchema } from "../../common/utils/validateSchema.js";
const authService = new AuthService()

export class AuthController {

    async registerUser(req:Request, res:Response) {

        const payload = await validateSchema(registerUserPayloadSchema, req.body)

        const registerUser = authService.registerUser.bind(authService)
        const user = await registerUser(payload)

        return res.status(201).json(ApiResponse.created("Successfully created user", {user}))
    }

    async loginUser(req:Request, res:Response) {
        const payload = await validateSchema(loginUserPayloadSchema, req.body)

        const loginUser = authService.loginUser.bind(authService)
        const user = await loginUser(payload)

        return res.status(201).json(ApiResponse.ok("Successfully logged in user", {user}))
    }

    async logoutUser(req:Request, res:Response) {
        // @ts-ignore
        const payload = await validateSchema(responseUserSchema, req.user)
        const logoutUser = authService.logoutUser.bind(authService)
        await logoutUser(payload)
        
        return res.status(200).json(ApiResponse.ok("Successfully logged out user"))
    }
}
