import { Router } from "express";
import { createBudgetController, getAllBudgetsOfOneUserController } from "../controllers/budget.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const budgetRoute = Router();

budgetRoute.post('/create', authenticateToken, createBudgetController);
budgetRoute.get('/all', authenticateToken, getAllBudgetsOfOneUserController);



export default budgetRoute;