import { Schema, model } from "mongoose";

const userCounterSchema = new Schema({
    _id: String,
    sequence_value: Number
})

const UserCounter = model('UserCounter', userCounterSchema);

export default UserCounter;