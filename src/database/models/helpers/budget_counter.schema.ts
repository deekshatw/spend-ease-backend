import { model, Schema } from "mongoose";

const budgetCounterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        required: true
    }
});

const BudgetCounter = model("BudgetCounter", budgetCounterSchema);

export default BudgetCounter;