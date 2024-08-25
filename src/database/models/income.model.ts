import mongoose, { Schema } from "mongoose";
import { ExpenseInterface } from "../interfaces/expense.interface";
import { IncomeInterface } from "../interfaces/income.interface";

const incomeSchema = new Schema<IncomeInterface>({
    incomeId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "Income description"
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true,
        ref: 'UserModel'
    },
    categoryId: {
        type: String,
        required: true,
        ref: 'CategoryModel'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const IncomeModel = mongoose.model<IncomeInterface>('IncomeModel', incomeSchema);
export default IncomeModel;