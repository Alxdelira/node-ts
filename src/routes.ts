import { Router } from "express";
import UserController from "./controllers/UserController";

export const router = Router()

const userController = new UserController()

router.post('/user', userController.creatUser)
router.get('/user', userController.getALlUser)
router.delete('/user', userController.deleteUser)
