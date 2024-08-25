import { create } from "domain";
import { Router } from "express";
import { createExpenseController, getAllExpensesOfOneUserController } from "../controllers/expense.controller";
import { get } from "http";
import { authenticateToken } from "../middlewares/auth.middleware";

const expenseRoute = Router();

expenseRoute.post('/create', createExpenseController);
expenseRoute.get('/list', authenticateToken, getAllExpensesOfOneUserController);

export default expenseRoute;