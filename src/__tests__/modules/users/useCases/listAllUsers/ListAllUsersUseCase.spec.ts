import { User } from "../../../../../modules/users/models/User";
import { UserRepositoryMemory } from "../../../../../modules/users/repositories/implementations/UserRepositoryMemory";
import { IUserRepository } from "../../../../../modules/users/repositories/IUserRepository";
import { ListAllUsersUseCase } from "../../../../../modules/users/useCases/listAllUsers/ListAllUsersUseCase";
import { createUser } from "../../builders/UserBuilder";

describe("TurnUserAdminUseCase", () => {

    let listAllUsersUseCase: ListAllUsersUseCase;
    let userRepository: IUserRepository;

    beforeEach(async () => {
        userRepository = UserRepositoryMemory.getInstance();
        listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
    });
     
    it("Should be able to get user profile by ID", async () => {
        let userAdmin = createUser();
        userAdmin = await userRepository.create({ name: userAdmin.name, email: userAdmin.email, admin: true });
        let userDefault = createUser();
        userDefault = await userRepository.create({ name: userDefault.name, email: userDefault.email });
        const users = await listAllUsersUseCase.execute(userAdmin.id);
        expect(users.length >= 2).toBeTruthy();
        expect(users.find(u => u.id === userAdmin.id)).toMatchObject(userAdmin);
        expect(users.find(u => u.id === userDefault.id)).toMatchObject(userDefault);
    });

    it("Should not be able to a non admin user get list of all users", async () => {
        try {
            let userDefault = createUser();
            userDefault = await userRepository.create({ name: userDefault.name, email: userDefault.email });
            await listAllUsersUseCase.execute(userDefault.id);
        } catch (error: any) {
            expect(error.message).toBe("Not allowed");
        }
    });

    it("Should not be able to a non existing user get list of all users", async () => {
        try {
            let userDefault = createUser();
            userDefault = await userRepository.create({ name: userDefault.name, email: userDefault.email });
            await listAllUsersUseCase.execute("not_existing_id");
        } catch (error: any) {
            expect(error.message).toBe("User not found");
        }
    });
});