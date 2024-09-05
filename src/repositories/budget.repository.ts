import { BudgetInterface } from "../database/interfaces/budget.interface";
import BudgetModel from "../database/models/budget.model";
import CategoryModel from "../database/models/category.model";
import { getNextBudgetId } from "../database/models/helpers/counter.service";

export const createBudgetRepository = async (budget: BudgetInterface): Promise<string> => {
    try {

        const isAlreadyExists = await BudgetModel.findOne({ userId: budget.userId, category: budget.category });
        if (isAlreadyExists) {
            return 'exists';
        } else {
            const budgetId = await getNextBudgetId();

            const created = await BudgetModel.create(
                {
                    budgetId: budgetId,
                    userId: budget.userId,
                    amount: budget.amount,
                    category: budget.category,
                    startDate: budget.startDate,
                    endDate: budget.endDate
                }
            );
            return created ? 'success' : 'error';
        }

    } catch (error) {
        console.error(error);
        return 'error';
    }
};

export const getBudgetsListRepository = async (userId: Number): Promise<any[]> => {
    try {

        const budgets = await BudgetModel.find({ userId });
        const results = await Promise.all(budgets.map(async (budget) => {
            const category = await CategoryModel.findOne({ categoryId: budget.category }).exec();
            return {
                budgetId: budget.budgetId,
                amount: budget.amount,
                category: category ? {
                    categoryId: category.categoryId,
                    name: category.name,
                    description: category.description
                } : null,
                startDate: budget.startDate,
                endDate: budget.endDate
            }
        }));

        return results;

    } catch (error) {
        return [];
    }
};