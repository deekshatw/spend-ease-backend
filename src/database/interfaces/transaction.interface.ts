import { Document } from "mongoose";

export interface TransactionInterface extends Document {
    transactionId: string;
    title: string;
    amount: number;
    description: string;
    transactionType: 'income' | 'expense';
    date: Date;
    userId: string;
    categoryId: string;
    createdAt: Date;
}