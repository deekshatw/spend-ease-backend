import { model, Schema } from "mongoose";

const categoryCounterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        required: true
    }
});

const CategoryCounter = model("CategoryCounter", categoryCounterSchema);

export default CategoryCounter;