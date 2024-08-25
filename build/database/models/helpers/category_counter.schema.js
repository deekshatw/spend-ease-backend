"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoryCounterSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        required: true
    }
});
const CategoryCounter = (0, mongoose_1.model)("CategoryCounter", categoryCounterSchema);
exports.default = CategoryCounter;
