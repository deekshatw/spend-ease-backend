import { CategoryInterface } from "../database/interfaces/category.interface";
import CategoryModel from "../database/models/category.model";
import { getNextCategoryId } from "../database/models/helpers/counter.service";

export const createCategoryRepository = async (category: CategoryInterface): Promise<string> => {
    try {

        const isAlreadyExists = await CategoryModel.findOne({ name: category.name });

        if (isAlreadyExists) {
            return 'exists';

        } else {
            const categoryId = await getNextCategoryId();

            const created = await CategoryModel.create(
                {
                    categoryId,
                    name: category.name,
                    description: category.description
                }
            );
            return created ? 'success' : 'error';
        }

    } catch (error) {
        console.error(error);
        return 'error';
    }
}

export const getCategoriesListRepository = async (): Promise<CategoryInterface[]> => {
    try {

        const categories = await CategoryModel.find({});

        return categories;

    } catch (error) {
        return [];
    }
};