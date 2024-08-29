import { Router } from "express";
import { createTransactionController, getAllTransactionsOfOneUserController } from "../controllers/transaction.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const transactionRoute = Router();

transactionRoute.post('/create', createTransactionController);
transactionRoute.get('', authenticateToken, getAllTransactionsOfOneUserController);

export default transactionRoute;