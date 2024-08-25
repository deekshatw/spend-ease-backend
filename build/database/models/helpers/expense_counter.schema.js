"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expenseCounterSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        required: true
    }
});
const ExpenseCounter = (0, mongoose_1.model)("ExpenseCounter", expenseCounterSchema);
exports.default = ExpenseCounter;
