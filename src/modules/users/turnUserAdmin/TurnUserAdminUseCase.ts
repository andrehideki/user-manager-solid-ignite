import { IUserRepository } from "../repositories/IUserRepository";

class TurnUserAdminUsecase {

    constructor(private userRepository: IUserRepository) {}

    async execute(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error("");
        await this.userRepository.turnAdmin(user);
    }
}

export { TurnUserAdminUsecase };

