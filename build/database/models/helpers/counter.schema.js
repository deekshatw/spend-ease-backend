"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userCounterSchema = new mongoose_1.Schema({
    _id: String,
    sequence_value: Number
});
const UserCounter = (0, mongoose_1.model)('UserCounter', userCounterSchema);
exports.default = UserCounter;
