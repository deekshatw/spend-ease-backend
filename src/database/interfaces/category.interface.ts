import { Document } from "mongoose";

export interface CategoryInterface extends Document {
    categoryId: string;
    name: string;
    description: string;
    createdAt: Date;
}