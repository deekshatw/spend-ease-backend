import { Document } from "mongoose";

export interface BudgetInterface extends Document {
    budgetId: string;
    userId: string;
    amount: number;
    spent: number;
    category: string;
    startDate: Date;
    endDate: Date;
    notificationsSent: {
        [key: number]: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}