import { validate } from "uuid";
import { UserRepositoryMemory } from "../../../../../modules/users/repositories/implementations/UserRepositoryMemory";
import { IUserRepository } from "../../../../../modules/users/repositories/IUserRepository";
import { CreateUserUseCase } from "../../../../../modules/users/useCases/createUser/CreateUserUseCase";
import { createUser } from "../../builders/UserBuilder";

describe("CreateUserUsecase", () => {
    
    let userRepository: IUserRepository;
    let createUserUsecase: CreateUserUseCase;

    beforeEach(() => {
        userRepository = UserRepositoryMemory.getInstance();
        createUserUsecase = new CreateUserUseCase(userRepository);
    });
     
    it("Should be able to create new users", async () => {
        const user = createUser();
        const createdUser = await createUserUsecase.execute({ name: user.name, email: user.email });
        expect(validate(createdUser.id)).toBeTruthy();
        expect(await userRepository.findById(createdUser.id)).toMatchObject({
            name: user.name,
            email: user.email,
            admin: false
        });
    });

    it("Should not be able to create new users when email is already taken", async () => {
        try {
            const user = createUser();
            await createUserUsecase.execute({ name: user.name, email: user.email });
            await createUserUsecase.execute({ name: user.name, email: user.email });
        } catch (error: any) {
            expect(error.message).toBe("Email is already taken");
        }
    });
});