import { Request, Response } from "express";
import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";


class TurnUserAdminController {

    constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

    async handle(request: Request, response: Response) {
        const { user_id: id } = request.params;
        const user = await this.turnUserAdminUseCase.execute(id);
        return response.status(200).json(user);
    }
}

export { TurnUserAdminController };