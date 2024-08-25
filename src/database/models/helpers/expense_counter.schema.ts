import { model, Schema } from "mongoose";

const expenseCounterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        required: true
    }
});

const ExpenseCounter = model("ExpenseCounter", expenseCounterSchema);

export default ExpenseCounter;