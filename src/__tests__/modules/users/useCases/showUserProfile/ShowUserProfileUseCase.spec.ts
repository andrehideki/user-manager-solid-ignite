import { User } from "../../../../../modules/users/models/User";
import { UserRepositoryMemory } from "../../../../../modules/users/repositories/implementations/UserRepositoryMemory";
import { IUserRepository } from "../../../../../modules/users/repositories/IUserRepository";
import { ShowUserProfileUseCase } from "../../../../../modules/users/useCases/showUserProfile/ShowUserProfileUseCase";
import { createUser } from "../../builders/UserBuilder";

describe("TurnUserAdminUseCase", () => {

    let showUserProfileUseCase: ShowUserProfileUseCase;
    let userRepository: IUserRepository;
    let user: User;

    beforeEach(async () => {
        userRepository = UserRepositoryMemory.getInstance();
        showUserProfileUseCase = new ShowUserProfileUseCase(userRepository);
        user = createUser();
        user = await userRepository.create({ name: user.name, email: user.email });
    });
     
    it("Should be able to get user profile by ID", async () => {
        const userProfile = await showUserProfileUseCase.execute(user.id);
        expect(userProfile).toMatchObject({
            name: user.name,
            email: user.email
        });
    });

    it("Should not be able to show profile of a non existing user", async () => {
        try {
            await showUserProfileUseCase.execute("non existing");
        } catch (error: any) {
            expect(error.message).toBe("User not found");
        }
    });
});