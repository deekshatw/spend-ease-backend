import { Router } from "express";
import { createUserController } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.post("/register", createUserController);

export default authRoute;