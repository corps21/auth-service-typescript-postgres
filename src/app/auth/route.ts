import {Router} from "express"
import { AuthController } from "./controller.js";

const router: Router = Router()
const authController = new AuthController()

router.get("/sign-in", authController.registerUser.bind(authController))

export default router;