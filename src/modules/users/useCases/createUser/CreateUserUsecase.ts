import { IUserRepository } from "../../repositories/IUserRepository";

interface Input {
    name: string;
    email: string;
}

class CreateUserUsecase {

    constructor(private userRepository: IUserRepository) {}

    async execute({ name, email }: Input) {
        const user = await this.userRepository.create({ name, email});
        return user;
    }
}

export { CreateUserUsecase };