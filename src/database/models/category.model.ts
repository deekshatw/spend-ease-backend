import mongoose, { Schema } from "mongoose";
import { CategoryInterface } from "../interfaces/category.interface";

const categorySchema = new Schema<CategoryInterface>({
    categoryId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "Category description"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const CategoryModel = mongoose.model<CategoryInterface>('CategoryModel', categorySchema);

export default CategoryModel;