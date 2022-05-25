import express from "express";
import { userRoutes } from "./routes/user.routes";

const app = express();
const port = 3333;

app.use('/users', userRoutes);

app.listen(port, () => console.log(`App listenning at: ${port}`));