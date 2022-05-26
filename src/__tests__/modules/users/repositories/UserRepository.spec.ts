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

    it("Should be able to list all users", async () => {
        const users = [createUser(), createUser()];
        users.map(async u => await userRepository.create({ name: u.name, email: u.email }));
        const repositoryUsers = await userRepository.list();
        expect(repositoryUsers.length >= 2).toBeTruthy();
        repositoryUsers.map(user => {
            expect(users.find(u => u.name == user.name)).not.toBeNull();
            expect(users.find(u => u.email == user.email)).not.toBeNull();
            expect(validate(user.id)).toBeTruthy();
        });
    });

    it("Should be able to find user by ID", async () => {
        const user = createUser();
        const savedUser = await userRepository.create({ name: user.name, email: user.email });
        const findedUser = await userRepository.findById(savedUser.id);
        expect(findedUser).toMatchObject(savedUser);
    });
    
    
//    Para que esse teste passe, é necessário que o método `findById` do arquivo 
// **src/modules/users/repositories/implementations/UsersRepository** receba o `id` ****de um usuário e ****retorne o usuário que possui o mesmo `id`.
});