import mongoose, { Schema } from "mongoose";
import { ExpenseInterface } from "../interfaces/expense.interface";

const expenseSchema = new Schema<ExpenseInterface>({
    expenseId: {
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
        default: "Expense description"
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

const ExpenseModel = mongoose.model<ExpenseInterface>('ExpenseModel', expenseSchema);
export default ExpenseModel;