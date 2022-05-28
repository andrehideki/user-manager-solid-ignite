import express, { Request, Response } from "express";
import { errorHandler } from "./errorHandler";
import { userRoutes } from "./routes/user.routes";

const app = express();

app.use(express.json());


app.use("/users", userRoutes);

app.use(errorHandler);

export { app };