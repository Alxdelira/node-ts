import { UserService } from './../services/UserService';
import { Request, Response } from "express"


export default class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }
    creatUser = (request: Request, response: Response) => {
        const user = request.body

        if (!user.name || !user.email) {
            return response.status(400).json({ message: "Bad Request: name e email obrigatorio" })

        }

        this.userService.creatUser(user.name, user.email)
        return response.status(201).json({ message: 'User Created' })
    }

    getALlUser = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json(users)
    }
    deleteUser = (request: Request, response: Response) => {
        const user = request.body
        console.log("deletando Usuario...", user)
        return response.status(200).json({ message: 'User Deleted' })
    }


}