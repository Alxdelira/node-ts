import { UserService } from './../services/UserService';
import { Request, Response } from "express"


export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }
    creatUser = (request: Request, response: Response) => {
        const user = request.body

        if (!user.name || !user.email || !user.password) {
            return response.status(400).json({ message: "Bad Request: Todos os campos são obrigatorios!" })

        }

        this.userService.creatUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'User Created' })
    }

    getUser = (request: Request, response: Response) => {
        return response.status(200).json
    }

    deleteUser = (request: Request, response: Response) => {
        const user = request.body
        console.log("deletando Usuario...", user)
        return response.status(200).json({ message: 'User Deleted' })
    }


}