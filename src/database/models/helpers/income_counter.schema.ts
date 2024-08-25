import { model, Schema } from "mongoose";

const incomeCounterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        required: true
    }
});

const IncomeCounter = model("IncomeCounter", incomeCounterSchema);

export default IncomeCounter;