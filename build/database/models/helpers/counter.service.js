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
exports.getNextIncomeId = exports.getNextExpenseId = exports.getNextCategoryId = exports.getNextUserId = void 0;
const category_counter_schema_1 = __importDefault(require("./category_counter.schema"));
const counter_schema_1 = __importDefault(require("./counter.schema"));
const expense_counter_schema_1 = __importDefault(require("./expense_counter.schema"));
const income_counter_schema_1 = __importDefault(require("./income_counter.schema"));
const getNextUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sequenceDocument = yield counter_schema_1.default.findByIdAndUpdate({ _id: 'userId' }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
    return (_a = sequenceDocument.sequence_value) !== null && _a !== void 0 ? _a : 1;
});
exports.getNextUserId = getNextUserId;
const getNextCategoryId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sequenceDocument = yield category_counter_schema_1.default.findByIdAndUpdate({ _id: 'categoryId' }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
    const sequenceValue = (_a = sequenceDocument.sequence_value) !== null && _a !== void 0 ? _a : 1;
    const formattedCategoryId = `C-${sequenceValue.toString().padStart(2, '0')}`;
    return formattedCategoryId;
});
exports.getNextCategoryId = getNextCategoryId;
const getNextExpenseId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sequenceDocument = yield expense_counter_schema_1.default.findByIdAndUpdate({ _id: 'expenseId' }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
    const sequenceValue = (_a = sequenceDocument.sequence_value) !== null && _a !== void 0 ? _a : 1;
    const formattedExpenseId = `E-${sequenceValue.toString().padStart(2, '0')}`;
    console.log(formattedExpenseId);
    return formattedExpenseId;
});
exports.getNextExpenseId = getNextExpenseId;
const getNextIncomeId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sequenceDocument = yield income_counter_schema_1.default.findByIdAndUpdate({ _id: 'incomeId' }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
    const sequenceValue = (_a = sequenceDocument.sequence_value) !== null && _a !== void 0 ? _a : 1;
    const formattedIncomeId = `I-${sequenceValue.toString().padStart(2, '0')}`;
    console.log(formattedIncomeId);
    return formattedIncomeId;
});
exports.getNextIncomeId = getNextIncomeId;
