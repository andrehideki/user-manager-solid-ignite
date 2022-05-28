import { Request, Response } from "express";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";


class ListAllUsersController {

    constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

    async handle(request: Request, response: Response) {
        const { user_id } = request.headers || "";
        const users = await this.listAllUsersUseCase.execute(`${user_id}`);
        return response.json(users);
    }
}

export { ListAllUsersController };