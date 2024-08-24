import { Router } from "express";
import { createUserController, loginUserController } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.post("/register", createUserController);
authRoute.post("/login", loginUserController);

export default authRoute;