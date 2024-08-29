import { model, Schema } from "mongoose";

const transactionCounterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        required: true
    }
});

const TransactionCounter = model("TransactionCounter", transactionCounterSchema);

export default TransactionCounter;