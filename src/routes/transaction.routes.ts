import { Router } from "express";
import { createTransactionController, getAllTransactionsOfOneUserController, getTransactionSummaryController } from "../controllers/transaction.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const transactionRoute = Router();

transactionRoute.post('/create', createTransactionController);
transactionRoute.get('', authenticateToken, getAllTransactionsOfOneUserController);
transactionRoute.get('/summary', authenticateToken, getTransactionSummaryController);

export default transactionRoute;