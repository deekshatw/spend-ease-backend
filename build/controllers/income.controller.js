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
exports.getAllIncomesOfOneUserController = exports.createIncomeController = void 0;
const income_repository_1 = require("../repositories/income.repository");
const createIncomeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const income = req.body;
    console.log(income);
    try {
        const response = yield (0, income_repository_1.createIncomeRepository)(income);
        console.log(response);
        if (response === 'success') {
            res.status(201).json({
                "success": true,
                "message": "Income created successfully"
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
exports.createIncomeController = createIncomeController;
const getAllIncomesOfOneUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(userId);
    if (!userId) {
        res.status(400).json({ success: false, message: "User ID not found" });
    }
    try {
        const incomes = yield (0, income_repository_1.getAllIncomesOfOneUserRepository)(userId);
        res.status(200).json({
            "success": true,
            "data": incomes.map(income => {
                return {
                    "incomeId": income.incomeId,
                    "amount": income.amount,
                    "description": income.description,
                    "date": income.date,
                    "userId": income.userId,
                    "categoryId": income.categoryId
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
exports.getAllIncomesOfOneUserController = getAllIncomesOfOneUserController;
