import { IUserRepository } from "../../repositories/IUserRepository";

class TurnUserAdminUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error("User not found");
        await this.userRepository.turnAdmin(user);
        return user;
    }
}

export { TurnUserAdminUseCase };

