import { Router } from "express";
import helloRouter from "./hello.routes";
import authRoute from "./auth.routes";

export const router = Router();

router.use('/hello', helloRouter);
router.use('/auth', authRoute);