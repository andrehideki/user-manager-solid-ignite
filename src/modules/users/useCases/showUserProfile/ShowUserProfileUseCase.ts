import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/IUserRepository";

class ShowUserProfileUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<User|undefined> {
        const user = await this.userRepository.findById(id);
        return user;
    }
}

export { ShowUserProfileUseCase };

