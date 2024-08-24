import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

const userSchema = new Schema<UserInterface>({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model<UserInterface>('UserModel', userSchema);
export default userModel;