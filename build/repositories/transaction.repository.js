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
exports.getAllTransactionsOfOneUserRepository = exports.createTransactionRepository = void 0;
const category_model_1 = __importDefault(require("../database/models/category.model"));
const counter_service_1 = require("../database/models/helpers/counter.service");
const transaction_model_1 = __importDefault(require("../database/models/transaction.model"));
const createTransactionRepository = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = yield (0, counter_service_1.getNextTransactionId)();
        const created = yield transaction_model_1.default.create({
            transactionId: transactionId,
            amount: transaction.amount,
            description: transaction.description,
            date: transaction.date,
            userId: transaction.userId,
            categoryId: transaction.categoryId,
            transactionType: transaction.transactionType
        });
        console.log(created);
        return created ? 'success' : 'error';
    }
    catch (error) {
        console.error(error);
        return 'error';
    }
});
exports.createTransactionRepository = createTransactionRepository;
const getAllTransactionsOfOneUserRepository = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, filters = {}) {
    try {
        const query = { userId };
        if (filters.startDate || filters.endDate) {
            query.date = {};
            if (filters.startDate) {
                query.date.$gte = filters.startDate;
            }
            if (filters.endDate) {
                query.date.$lte = filters.endDate;
            }
        }
        if (filters.type) {
            query.transactionType = filters.type;
        }
        // Find all transactions based on the query
        const transactions = yield transaction_model_1.default.find(query).sort({ date: -1 }).exec();
        console.log("Unsorted transactions:", transactions);
        // For each transaction, fetch the associated category
        const result = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield category_model_1.default.findOne({ categoryId: transaction.categoryId }).exec();
            return {
                transactionId: transaction.transactionId,
                amount: transaction.amount,
                description: transaction.description,
                date: transaction.date,
                userId: transaction.userId,
                category: category ? {
                    categoryId: category.categoryId,
                    name: category.name,
                    description: category.description
                } : null, // Handle case where the category is not found
                transactionType: transaction.transactionType,
            };
        })));
        return result;
    }
    catch (error) {
        console.error(error);
        return [];
    }
});
exports.getAllTransactionsOfOneUserRepository = getAllTransactionsOfOneUserRepository;
