import { Request, Response } from "express";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


class ShowUserProfileController {

    constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

    async handle(request: Request, response: Response) {
        const { user_id: id } = request.params;
        const user = await this.showUserProfileUseCase.execute(id);
        return response.json(user);
    }
}

export { ShowUserProfileController };