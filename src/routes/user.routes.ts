import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";

const userRoutes = Router();

userRoutes.post("/", asyncHandler(async (request, response) => {
    await createUserController.handle(request, response);
}));

userRoutes.patch("/:user_id/admin", asyncHandler(async (request, response) => {
    await turnUserAdminController.handle(request, response);
}));

userRoutes.get("/:user_id", asyncHandler(async (request, response) => {
    await showUserProfileController.handle(request, response);
}));

userRoutes.get("/", asyncHandler(async (request, response) => {
    await listAllUsersController.handle(request, response);
}));

export { userRoutes };