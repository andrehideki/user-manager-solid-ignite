import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/IUserRepository";

class ListAllUsersUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(): Promise<User[]> {
        return await this.userRepository.list();
    }
}

export { ListAllUsersUseCase };