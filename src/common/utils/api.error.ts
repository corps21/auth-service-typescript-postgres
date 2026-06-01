export class ApiError extends Error {
    statusCode: number

    constructor(message = "Something went wrong", statusCode = 500) {
        super(message)
        this.statusCode = statusCode
    }

    static badRequest(message: string) {
        return new ApiError(message, 400)
    }

    static conflict(message: string) {
        return new ApiError(message, 409)
    }
}