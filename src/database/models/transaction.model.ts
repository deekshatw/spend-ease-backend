import mongoose, { Schema } from "mongoose";
import { TransactionInterface } from "../interfaces/transaction.interface";

const transactionSchema = new Schema<TransactionInterface>({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "Transaction description"
    },
    transactionType: {
        enum: ['income', 'expense'],
        type: String,
        required: true
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

const TransactionModel = mongoose.model<TransactionInterface>('TransactionModel', transactionSchema);
export default TransactionModel;