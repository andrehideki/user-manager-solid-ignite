import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UserRepositoryMemory } from "../modules/users/repositories/implementations/UserRepositoryMemory";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { CreateUserUseCase } from "../modules/users/useCases/createUser/CreateUserUseCase";
import { ShowUserProfileController } from "../modules/users/useCases/showUserProfile/ShowUserProfileController";
import { ShowUserProfileUseCase } from "../modules/users/useCases/showUserProfile/ShowUserProfileUseCase";
import { TurnUserAdminController } from "../modules/users/useCases/turnUserAdmin/TurnUserAdminController";
import { TurnUserAdminUseCase } from "../modules/users/useCases/turnUserAdmin/TurnUserAdminUseCase";

const userRoutes = Router();
const userRepository = UserRepositoryMemory.getInstance();

userRoutes.post("/", asyncHandler(async (request, response) => {
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createUserController = new CreateUserController(createUserUseCase);
    await createUserController.handle(request, response);
}));

userRoutes.patch("/:user_id/admin", asyncHandler(async (request, response) => {
    const turnUserAdminUseCase = new TurnUserAdminUseCase(userRepository);
    const turnUserAdminController = new TurnUserAdminController(turnUserAdminUseCase);
    await turnUserAdminController.handle(request, response);
}));

userRoutes.get("/:user_id", (request, response) => {
    const showUserProfileUseCase = new ShowUserProfileUseCase(userRepository);
    const showUserProfileController = new ShowUserProfileController(showUserProfileUseCase);
    return showUserProfileController.handle(request, response);
});

// A rota deve receber, pelo header da requisição, uma propriedade `user_id` contendo o `id` do usuário e retornar uma lista com todos os usuários cadastrados. O `id` deverá ser usado para validar se o usuário que está solicitando a listagem é um admin. O retorno da lista deve ser feito apenas se o usuário for admin.
userRoutes.get("/:user_id", (request, response) => {
    return response.send();
});

export { userRoutes };