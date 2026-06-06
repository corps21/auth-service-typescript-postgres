import fs from "node:fs/promises"

export async function injectKeys() {
    if(process.env.JWT_PRIVATE_KEY?.trim() && process.env.JWT_PUBLIC_KEY?.trim()) return

    const privateKey = await fs.readFile(process.env.PRIVATE_KEY_PATH!, "utf8")
    process.env.JWT_PRIVATE_KEY = privateKey
    const publicKey = await fs.readFile(process.env.PUBLIC_KEY_PATH!, "utf8")
    process.env.JWT_PUBLIC_KEY = publicKey
}