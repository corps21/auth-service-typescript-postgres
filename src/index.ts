import {createServer} from "node:http"
import {config} from "dotenv"
import { envSchema } from "./common/schema/schema.js"
import { createExpressServer } from "./app/index.js"

config({
    path: ".env"
})

async function main() {
    const server = createServer(createExpressServer())

    const validationResult = await envSchema.safeParseAsync(process.env) 
    if(validationResult.error) {
        throw new Error(validationResult.error.message)
    }

    server.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
}

main()
