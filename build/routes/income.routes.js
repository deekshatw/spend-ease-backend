"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const income_controller_1 = require("../controllers/income.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const incomeRoute = (0, express_1.Router)();
incomeRoute.post('/create', income_controller_1.createIncomeController);
incomeRoute.get('/list', auth_middleware_1.authenticateToken, income_controller_1.getAllIncomesOfOneUserController);
exports.default = incomeRoute;
