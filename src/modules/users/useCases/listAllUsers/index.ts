import { UserRepositoryMemory } from "../../repositories/implementations/UserRepositoryMemory";
import { ListAllUsersController } from "./ListAllUsersController";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

const usersRepository = UserRepositoryMemory.getInstance();
const listAllUsersUseCase = new ListAllUsersUseCase(usersRepository);
const listAllUsersController = new ListAllUsersController(listAllUsersUseCase);

export { listAllUsersController };