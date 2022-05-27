import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {

    constructor(private createUserUseCase: CreateUserUseCase) {}

    async handle(request: Request, response: Response) {
        const { name, email } = request.body;
        const user = await this.createUserUseCase.execute({ name, email });
        return response.status(201).json(user);
    }
}

export { CreateUserController };