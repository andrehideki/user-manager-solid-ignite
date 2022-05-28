import { Request, Response } from "express";

function errorHandler(error: Error, req: Request, res: Response, next: () => void) {
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return next();
}


export { errorHandler };