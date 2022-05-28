import { UserRepositoryMemory } from "../../repositories/implementations/UserRepositoryMemory";
import { TurnUserAdminController } from "./TurnUserAdminController";
import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

const usersRepository = UserRepositoryMemory.getInstance();
const turnUserAdminUseCase = new TurnUserAdminUseCase(usersRepository);
const turnUserAdminController = new TurnUserAdminController(turnUserAdminUseCase);

export { turnUserAdminController };