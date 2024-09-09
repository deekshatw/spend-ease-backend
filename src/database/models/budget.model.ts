import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema({
    budgetId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    spent: {
        type: Number,
        default: 0,

    },
    category: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    notificationsSent: {
        type: Map,
        of: Boolean,
        default: {
            50: false,
            75: false,
            100: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const BudgetModel = mongoose.model('BudgetModel', budgetSchema);

export default BudgetModel;