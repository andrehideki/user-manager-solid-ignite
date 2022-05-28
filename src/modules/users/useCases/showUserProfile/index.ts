import { UserRepositoryMemory } from "../../repositories/implementations/UserRepositoryMemory";
import { ShowUserProfileController } from "./ShowUserProfileController";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

const usersRepository = UserRepositoryMemory.getInstance();
const showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);
const showUserProfileController = new ShowUserProfileController(showUserProfileUseCase);

export { showUserProfileController };