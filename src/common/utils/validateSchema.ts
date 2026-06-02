import { ZodObject, z } from "zod";
import { ApiError } from "./api.error.js";

export async function validateSchema<T,S extends ZodObject>(schema: S, data:T){
    const validationResult = await schema.safeParseAsync(data)
    if(validationResult.error) throw ApiError.badRequest(validationResult.error.message)
    return validationResult.data
}
