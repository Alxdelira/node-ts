import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { verifyAuth } from "./midlleware/middleware";

export const router = Router()

const userController = new UserController()
const loginController = new LoginController()

router.post('/user', verifyAuth, userController.createUser)
router.get('/user/:userId', verifyAuth, userController.getUserId)
router.get('/user',  userController.getAllUser)
router.delete('/user', verifyAuth, userController.deleteUser)

router.post('/login', loginController.login)
