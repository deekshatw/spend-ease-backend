import { Router } from "express";
import { createTransactionController, deleteTransactionController, getAllTransactionsOfOneUserController, getTransactionSummaryController, updateTransactionController } from "../controllers/transaction.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const transactionRoute = Router();

transactionRoute.post('/create', createTransactionController);
transactionRoute.get('', authenticateToken, getAllTransactionsOfOneUserController);
transactionRoute.get('/summary', authenticateToken, getTransactionSummaryController);
transactionRoute.delete('/delete/:transactionId', authenticateToken, deleteTransactionController);
transactionRoute.put('/update/:transactionId', authenticateToken, updateTransactionController);

export default transactionRoute;