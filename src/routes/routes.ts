import { Router } from "express";
import helloRouter from "./hello.routes";
import authRoute from "./auth.routes";
import categoryRoute from "./category.routes";
import transactionRoute from "./transaction.routes";
import budgetRoute from "./budget.routes";

export const router = Router();

router.use('/hello', helloRouter);
router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/transaction', transactionRoute);
router.use('/budget', budgetRoute);