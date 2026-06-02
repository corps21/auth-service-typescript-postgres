export class ApiResponse<T> {
    message: string
    statusCode: number
    data: T

    constructor(message = "Success", statusCode = 200, data: T) {
        this.message = message
        this.statusCode = statusCode
        this.data = data
    }

    static ok(message: string, data?: unknown) {
        return new ApiResponse(message, 200, data)
    }

    static created<T>(message: string, data: T) {
        return new ApiResponse(message,201, data)
    }
}
