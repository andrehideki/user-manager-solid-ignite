import { validate } from "uuid";
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
        const createdUser = await userRepository.create({
            name: user.name,
            email: user.email
        });
        expect(createdUser).toMatchObject({
            name: user.name,
            email: user.email,
            admin: false
        });
        expect(validate(user.id)).toBeTruthy();
    });
});