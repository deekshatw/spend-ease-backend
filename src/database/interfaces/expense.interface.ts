import { Document } from "mongoose";

export interface ExpenseInterface extends Document {
    expenseId: string;
    amount: number;
    description: string;
    date: Date;
    userId: string;
    categoryId: string;
    createdAt: Date;
}