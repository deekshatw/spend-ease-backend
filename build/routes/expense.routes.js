"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expense_controller_1 = require("../controllers/expense.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const expenseRoute = (0, express_1.Router)();
expenseRoute.post('/create', expense_controller_1.createExpenseController);
expenseRoute.get('/list', auth_middleware_1.authenticateToken, expense_controller_1.getAllExpensesOfOneUserController);
exports.default = expenseRoute;
