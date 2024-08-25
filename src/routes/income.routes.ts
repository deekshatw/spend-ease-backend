import { Router } from "express";
import { createIncomeController, getAllIncomesOfOneUserController } from "../controllers/income.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const incomeRoute = Router();

incomeRoute.post('/create', createIncomeController);
incomeRoute.get('/list', authenticateToken, getAllIncomesOfOneUserController);

export default incomeRoute;