import type { Request, Response } from "express";
import { registerUserPayloadSchema } from "./model.js";
import { ApiError } from "../../common/utils/api.error.js";
import { AuthService } from "./service.js";
import { ApiResponse } from "../../common/utils/api.response.js";

const authService = new AuthService()

export class AuthController {

    async registerUser(req:Request, res:Response) {
        const validationResult = await registerUserPayloadSchema.safeParseAsync(req.body)
        if(validationResult.error) throw ApiError.badRequest(validationResult.error.message)
        
        const payload = validationResult.data
        const registerUser = authService.registerUser.bind(authService)
        const user = await registerUser(payload)

        return res.status(201).json(ApiResponse.created("Successfully created user", user))
    }
}