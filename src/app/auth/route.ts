import {Router} from "express"
import { AuthController } from "./controller.js";

const router: Router = Router()
const authController = new AuthController()

router.post("/sign-in", authController.registerUser.bind(authController))
router.post("/log-in", authController.loginUser.bind(authController))

export default router;
