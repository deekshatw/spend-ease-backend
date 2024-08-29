"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const transactionRoute = (0, express_1.Router)();
transactionRoute.post('/create', transaction_controller_1.createTransactionController);
transactionRoute.get('', auth_middleware_1.authenticateToken, transaction_controller_1.getAllTransactionsOfOneUserController);
exports.default = transactionRoute;
