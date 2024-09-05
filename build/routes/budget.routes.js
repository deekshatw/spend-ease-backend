"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budget_controller_1 = require("../controllers/budget.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const budgetRoute = (0, express_1.Router)();
budgetRoute.post('/create', auth_middleware_1.authenticateToken, budget_controller_1.createBudgetController);
budgetRoute.get('/all', auth_middleware_1.authenticateToken, budget_controller_1.getAllBudgetsOfOneUserController);
exports.default = budgetRoute;
