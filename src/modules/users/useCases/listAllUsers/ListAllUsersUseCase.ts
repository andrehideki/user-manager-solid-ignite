import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/IUserRepository";

class ListAllUsersUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<User[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error("User not found");
        if (!user?.admin) throw new Error("Not allowed");
        return await this.userRepository.list();
    }
}

export { ListAllUsersUseCase };