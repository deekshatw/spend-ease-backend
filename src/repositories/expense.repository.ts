import { ExpenseInterface } from "../database/interfaces/expense.interface";
import ExpenseModel from "../database/models/expense.model";
import { getNextExpenseId } from "../database/models/helpers/counter.service";

export const createExpenseRepository = async (expense: ExpenseInterface): Promise<string> => {
    try {
        const expenseId = await getNextExpenseId();
        const created = await ExpenseModel.create({
            expenseId: expenseId,
            amount: expense.amount,
            description: expense.description,
            date: expense.date,
            userId: expense.userId,
            categoryId: expense.categoryId
        });
        console.log(created);
        return created ? 'success' : 'error';
    } catch (error) {
        console.error(error);
        return 'error';
    }
};

export const getAllExpensesOfOneUserRepository = async (userId: number): Promise<ExpenseInterface[]> => {
    try {
        const expenses = await ExpenseModel.find({ userId }).exec();
        return expenses;
    } catch (error) {
        console.error(error);
        return [];
    }
}