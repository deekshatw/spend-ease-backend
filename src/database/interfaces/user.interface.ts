import { Document } from "mongoose";

export interface UserInterface extends Document {
    userId: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}