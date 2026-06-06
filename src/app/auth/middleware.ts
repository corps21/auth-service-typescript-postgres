import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../common/utils/jwt.js";
import { ApiError } from "../../common/utils/api.error.js";

export const authenticateUser = (req:Request, res:Response, next:NextFunction) => {
    if(!req.headers?.authorization || !req.headers?.authorization?.startsWith("Bearer")) {
        return next()
    }
    
    const token = req.headers.authorization?.split(" ")[1]
    
    if(token?.trim() === "" || !token) {
        return next()
    }
    
    const decodedToken = verifyToken(token, {algorithms: ["RS256"]})

    // @ts-ignore
    const {iat, exp, ...user} = decodedToken
    // @ts-ignore
    req.user = user
    next()
}

export const restrictUser = (req:Request, res:Response, next:NextFunction) => {
    // @ts-ignore

    if(!req.user) {
        throw ApiError.unauthorized("User is not authenticated")
    }

    next()
}