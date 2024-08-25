import { Document } from "mongoose";

export interface IncomeInterface extends Document {
    incomeId: string;
    amount: number;
    description: string;
    date: Date;
    userId: string;
    categoryId: string;
    createdAt: Date;
}