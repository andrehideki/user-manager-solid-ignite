import { IUserRepository } from "../../repositories/IUserRepository";

interface Input {
    name: string;
    email: string;
}

class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute({ name, email }: Input) {
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) {
            throw new Error("Email is already taken");
        }
        const user = await this.userRepository.create({ name, email });
        return user;
    }
}

export { CreateUserUseCase };