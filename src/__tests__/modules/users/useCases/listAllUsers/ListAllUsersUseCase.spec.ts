import { User } from "../../../../../modules/users/models/User";
import { UserRepositoryMemory } from "../../../../../modules/users/repositories/implementations/UserRepositoryMemory";
import { IUserRepository } from "../../../../../modules/users/repositories/IUserRepository";
import { ListAllUsersUseCase } from "../../../../../modules/users/useCases/listAllUsers/ListAllUsersUseCase";
import { createUser } from "../../builders/UserBuilder";

describe("TurnUserAdminUseCase", () => {

    let listAllUsersUseCase: ListAllUsersUseCase;
    let userRepository: IUserRepository;
    let user: User;

    beforeEach(async () => {
        userRepository = UserRepositoryMemory.getInstance();
        listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
    });
     
    it("Should be able to get user profile by ID", async () => {
        let user1 = createUser();
        user1 = await userRepository.create({ name: user1.name, email: user1.email });
        let user2 = createUser();
        user2 = await userRepository.create({ name: user2.name, email: user2.email });
        const users = await listAllUsersUseCase.execute();
        expect(users.length >= 2).toBeTruthy();
        expect(users.find(u => u.id === user1.id)).toMatchObject(user1);
        expect(users.find(u => u.id === user2.id)).toMatchObject(user2);
    });

    // it("Should not be able to show profile of a non existing user", async () => {
    //     try {
    //         await showUserProfileUseCase.execute("non existing");
    //     } catch (error: any) {
    //         expect(error.message).toBe("User not found");
    //     }
    // });
});