import { Request, Response } from "express";
import { NotFoundError } from "./modules/users/errors/notFoundError";

function errorHandler(error: Error, req: Request, res: Response, next: () => void) {
    if (error) {
        return res.status(
            error instanceof NotFoundError? 
            404 : 400
        ).json({ error: error.message });
    }
    return next();
}


export { errorHandler };