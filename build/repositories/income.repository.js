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
exports.getAllIncomesOfOneUserRepository = exports.createIncomeRepository = void 0;
const counter_service_1 = require("../database/models/helpers/counter.service");
const income_model_1 = __importDefault(require("../database/models/income.model"));
const createIncomeRepository = (income) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomeId = yield (0, counter_service_1.getNextIncomeId)();
        const created = yield income_model_1.default.create({
            incomeId: incomeId,
            amount: income.amount,
            description: income.description,
            date: income.date,
            userId: income.userId,
            categoryId: income.categoryId
        });
        console.log(created);
        return created ? 'success' : 'error';
    }
    catch (error) {
        console.error(error);
        return 'error';
    }
});
exports.createIncomeRepository = createIncomeRepository;
const getAllIncomesOfOneUserRepository = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield income_model_1.default.find({ userId }).exec();
        return expenses;
    }
    catch (error) {
        console.error(error);
        return [];
    }
});
exports.getAllIncomesOfOneUserRepository = getAllIncomesOfOneUserRepository;
