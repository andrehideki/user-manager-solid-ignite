import { NotFoundError } from "../../errors/notFoundError";
import { IUserRepository } from "../../repositories/IUserRepository";

class TurnUserAdminUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundError("User");
        await this.userRepository.turnAdmin(user);
        return user;
    }
}

export { TurnUserAdminUseCase };

