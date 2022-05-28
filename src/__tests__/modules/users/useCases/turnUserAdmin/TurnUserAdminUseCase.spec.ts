import { User } from "../../../../../modules/users/models/User";
import { UserRepositoryMemory } from "../../../../../modules/users/repositories/implementations/UserRepositoryMemory";
import { IUserRepository } from "../../../../../modules/users/repositories/IUserRepository";
import { TurnUserAdminUseCase } from "../../../../../modules/users/useCases/turnUserAdmin/TurnUserAdminUseCase";
import { createUser } from "../../builders/UserBuilder";

describe("TurnUserAdminUseCase", () => {

    let turnUserAdminUsecase: TurnUserAdminUseCase;
    let userRepository: IUserRepository;
    let user: User;

    beforeEach(async () => {
        userRepository = UserRepositoryMemory.getInstance();
        turnUserAdminUsecase = new TurnUserAdminUseCase(userRepository);
        user = createUser();
        user = await userRepository.create({ name: user.name, email: user.email });
    });
     
    it("Should be able to turn an user as admin", async () => {
        await turnUserAdminUsecase.execute(user.id);
        const findedUser = await userRepository.findById(user.id);
        expect(findedUser?.admin).toBeTruthy();
    });

    it("Should not be able to turn a non existing user as admin", async () => {
        try {
            await turnUserAdminUsecase.execute("non existing");
        } catch (error: any) {
            expect(error.message).toBe("User not found");
        }
    });
});