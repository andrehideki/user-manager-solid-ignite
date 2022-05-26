import { UserRepositoryMemory } from "../../../../modules/users/repositories/implementations/UserRepositoryMemory";
import { IUserRepository } from "../../../../modules/users/repositories/IUserRepository";
import { createUser } from "../builders/UserBuilder";

describe("UserRepository", () => {

    let userRepository: IUserRepository;
    
    beforeEach(() => {
        userRepository = UserRepositoryMemory.getInstance();
    });

    it("Should be able to create new users", async () => {
        const user = createUser();
        const createdUser = await userRepository.create(user);
        expect(user).toMatchObject(createdUser);
    });
});