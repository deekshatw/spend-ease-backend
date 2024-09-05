import { Document } from "mongoose";

export interface BudgetInterface extends Document {
    budgetId: string;
    userId: string;
    amount: number;
    category: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}