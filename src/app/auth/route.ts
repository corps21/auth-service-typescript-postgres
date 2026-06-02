import {Router} from "express"
import { AuthController } from "./controller.js";
import {authenticateUser} from "./middleware.js";

const router: Router = Router()
const authController = new AuthController()

router.post("/sign-in", authController.registerUser.bind(authController))
router.post("/log-in", authController.loginUser.bind(authController))


// protected routes
router.post("/log-out",authenticateUser, authController.logoutUser.bind(authController))

export default router;
