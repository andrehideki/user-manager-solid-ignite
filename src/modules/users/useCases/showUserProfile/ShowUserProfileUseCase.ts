import { NotFoundError } from "../../errors/notFoundError";
import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/IUserRepository";

class ShowUserProfileUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundError("User");
        return user;
    }
}

export { ShowUserProfileUseCase };

