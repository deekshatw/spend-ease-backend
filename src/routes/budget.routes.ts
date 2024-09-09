import { Router } from "express";
import { createBudgetController, getAllBudgetsOfOneUserController, updateBudgetController } from "../controllers/budget.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const budgetRoute = Router();

budgetRoute.post('/create', authenticateToken, createBudgetController);
budgetRoute.get('/all', authenticateToken, getAllBudgetsOfOneUserController);
budgetRoute.put('/update/:budgetId', authenticateToken, updateBudgetController);
budgetRoute.delete('/delete/:budgetId', authenticateToken, deleteBudgetController);


export default budgetRoute;