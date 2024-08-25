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
exports.getNextCategoryId = exports.getNextUserId = void 0;
const category_counter_schema_1 = __importDefault(require("./category_counter.schema"));
const counter_schema_1 = __importDefault(require("./counter.schema"));
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
    // Format the sequence value to have at least two digits (e.g., C-01, C-02)
    const formattedCategoryId = `C-${sequenceValue.toString().padStart(2, '0')}`;
    console.log(formattedCategoryId);
    return formattedCategoryId;
});
exports.getNextCategoryId = getNextCategoryId;
