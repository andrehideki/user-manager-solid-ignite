import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UserRepositoryMemory } from "../modules/users/repositories/implementations/UserRepositoryMemory";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { CreateUserUseCase } from "../modules/users/useCases/createUser/CreateUserUseCase";

const userRoutes = Router();
const userRepository = UserRepositoryMemory.getInstance();

userRoutes.post("/", asyncHandler(async (request, response) => {
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createUserController = new CreateUserController(createUserUseCase);
    await createUserController.handle(request, response);
}));

// A rota deve receber, nos parâmetros da rota, o `id` de um usuário e transformar esse usuário em admin.
userRoutes.patch("/:user_id/admin", (request, response) => {
    return response.send();
});

//A rota deve receber, nos parâmetros da rota, o `id` de um usuário e devolver as informações do usuário encontrado pelo corpo da resposta.
userRoutes.get("/:user_id", (request, response) => {
    return response.send();
});

// A rota deve receber, pelo header da requisição, uma propriedade `user_id` contendo o `id` do usuário e retornar uma lista com todos os usuários cadastrados. O `id` deverá ser usado para validar se o usuário que está solicitando a listagem é um admin. O retorno da lista deve ser feito apenas se o usuário for admin.
userRoutes.get("/:user_id", (request, response) => {
    return response.send();
});

export { userRoutes };