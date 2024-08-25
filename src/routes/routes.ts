import { Router } from "express";
import helloRouter from "./hello.routes";
import authRoute from "./auth.routes";
import categoryRoute from "./category.routes";

export const router = Router();

router.use('/hello', helloRouter);
router.use('/auth', authRoute);
router.use('/category', categoryRoute);