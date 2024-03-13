import { MockResponse } from '../_mocks_/mockResponse.mock';
import { UserService } from './../services/UserService';
import { Request, Response } from "express"


export class UserController {
    getToken(mockRequest: globalThis.Request, mockResponse: MockResponse<unknown>) {
        throw new Error('Method not implemented.');
    }
    userService: UserService

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }
    createUser = (request: Request, response: Response) => {
        const user = request.body

        if (!user.name || !user.email || !user.password) {
            return response.status(400).json({ message: "Bad Request: Todos os campos são obrigatorios!" })

        }

        this.userService.creatUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'User Created', user })
    }

    getUserId = async (request: Request, response: Response) => {
        const { userId } = request.params
        const user = await this.userService.getUserId(userId)
        return response.status(200).json({
            userId: user?.user_id,
            name: user?.name,
            email: user?.email
        })
    }

    getAllUser = async (request: Request, response: Response) => {
        const users = await this.userService.getAllUser()
        return response.status(200).json(users)
    }

    deleteUser = (request: Request, response: Response) => {
        const user = request.body
        console.log("deletando Usuario...", user)
        return response.status(200).json({ message: 'User Deleted' })
    }


}