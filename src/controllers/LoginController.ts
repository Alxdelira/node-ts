import { Request, Response } from "express";
import { UserService } from "../services/UserService";


export class LoginController {
    userService: UserService;

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService;
    }
    login = async (request: Request, response: Response) => {
        const { email, password } = request.body;

        const token = await this.userService.getTokens(email, password);        
        return response.status(200).json({token});
    }
}