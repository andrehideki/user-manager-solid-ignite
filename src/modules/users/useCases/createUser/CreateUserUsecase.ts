import { IUserRepository } from "../../repositories/IUserRepository";

interface Input {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute({ name, email, admin }: Input) {
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) {
            throw new Error("Email is already taken");
        }
        const user = await this.userRepository.create({ name, email, admin: !!admin });
        return user;
    }
}

export { CreateUserUseCase };