import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/IUserRepository";

class ShowUserProfileUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error("User not found");
        return user;
    }
}

export { ShowUserProfileUseCase };

