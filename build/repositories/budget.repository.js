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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgetsListRepository = exports.createBudgetRepository = void 0;
const budget_model_1 = __importDefault(require("../database/models/budget.model"));
const category_model_1 = __importDefault(require("../database/models/category.model"));
const counter_service_1 = require("../database/models/helpers/counter.service");
const createBudgetRepository = (budget) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAlreadyExists = yield budget_model_1.default.findOne({ userId: budget.userId, category: budget.category });
        if (isAlreadyExists) {
            return 'exists';
        }
        else {
            const budgetId = yield (0, counter_service_1.getNextBudgetId)();
            const created = yield budget_model_1.default.create({
                budgetId: budgetId,
                userId: budget.userId,
                amount: budget.amount,
                category: budget.category,
                startDate: budget.startDate,
                endDate: budget.endDate
            });
            return created ? 'success' : 'error';
        }
    }
    catch (error) {
        console.error(error);
        return 'error';
    }
});
exports.createBudgetRepository = createBudgetRepository;
const getBudgetsListRepository = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budgets = yield budget_model_1.default.find({ userId });
        const results = yield Promise.all(budgets.map((budget) => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield category_model_1.default.findOne({ categoryId: budget.category }).exec();
            return {
                budgetId: budget.budgetId,
                amount: budget.amount,
                category: category ? {
                    categoryId: category.categoryId,
                    name: category.name,
                    description: category.description
                } : null,
                startDate: budget.startDate,
                endDate: budget.endDate
            };
        })));
        return results;
    }
    catch (error) {
        return [];
    }
});
exports.getBudgetsListRepository = getBudgetsListRepository;
