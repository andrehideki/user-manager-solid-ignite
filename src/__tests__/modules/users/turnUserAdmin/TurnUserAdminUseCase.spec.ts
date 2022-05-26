import { validate } from "uuid";
import { User } from "../../../../modules/users/models/User";
import { UserRepositoryMemory } from "../../../../modules/users/repositories/implementations/UserRepositoryMemory";
import { IUserRepository } from "../../../../modules/users/repositories/IUserRepository";
import { TurnUserAdminUsecase } from "../../../../modules/users/turnUserAdmin/TurnUserAdminUseCase";
import { createUser } from "../builders/UserBuilder";

describe("TurnUserAdminUseCase", () => {

    let turnUserAdminUsecase: TurnUserAdminUsecase;
    let userRepository: IUserRepository;
    let user: User;

    beforeEach(async () => {
        userRepository = UserRepositoryMemory.getInstance();
        turnUserAdminUsecase = new TurnUserAdminUsecase(userRepository);
        user = createUser();
        user = await userRepository.create({ name: user.name, email: user.email });
    });
     
    it("Should be able to turn an user as admin", async () => {
        await turnUserAdminUsecase.execute(user.id);
        const findedUser = await userRepository.findById(user.id);
        expect(findedUser?.admin).toBeTruthy();
    });
});