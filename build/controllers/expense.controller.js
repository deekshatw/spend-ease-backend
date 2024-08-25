"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExpensesOfOneUserController = exports.createExpenseController = void 0;
const expense_repository_1 = require("../repositories/expense.repository");
const createExpenseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = req.body;
    console.log(expense);
    try {
        const response = yield (0, expense_repository_1.createExpenseRepository)(expense);
        console.log(response);
        if (response === 'success') {
            res.status(201).json({
                "success": true,
                "message": "Expense created successfully"
            });
        }
        else {
            res.status(500).json({
                "success": false,
                "message": "Internal server error"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": error
        });
    }
});
exports.createExpenseController = createExpenseController;
const getAllExpensesOfOneUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(userId);
    if (!userId) {
        res.status(400).json({ success: false, message: "User ID not found" });
    }
    try {
        const expenses = yield (0, expense_repository_1.getAllExpensesOfOneUserRepository)(userId);
        res.status(200).json({
            "success": true,
            "data": expenses.map(expense => {
                return {
                    "expenseId": expense.expenseId,
                    "amount": expense.amount,
                    "description": expense.description,
                    "date": expense.date,
                    "userId": expense.userId,
                    "categoryId": expense.categoryId
                };
            })
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": error
        });
    }
});
exports.getAllExpensesOfOneUserController = getAllExpensesOfOneUserController;
