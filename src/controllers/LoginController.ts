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
        try {
            if (!email || !password) {
                return response.status(400).json({ message: "Bad Request: Todos os campos são obrigatorios!" });
            }
            const token = await this.userService.getTokens(email, password);
            return response.status(200).json({ token });
        } catch (error) {
            return response.status(500).json({ message: "email ou usuario Inalidos!" });

        }
    }
}