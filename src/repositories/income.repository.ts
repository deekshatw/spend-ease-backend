import { IncomeInterface } from "../database/interfaces/income.interface";
import { getNextIncomeId } from "../database/models/helpers/counter.service";
import IncomeModel from "../database/models/income.model";

export const createIncomeRepository = async (income: IncomeInterface): Promise<string> => {
    try {
        const incomeId = await getNextIncomeId();
        const created = await IncomeModel.create({
            incomeId: incomeId,
            amount: income.amount,
            description: income.description,
            date: income.date,
            userId: income.userId,
            categoryId: income.categoryId
        });
        console.log(created);
        return created ? 'success' : 'error';
    } catch (error) {
        console.error(error);
        return 'error';
    }
}

export const getAllIncomesOfOneUserRepository = async (userId: number): Promise<IncomeInterface[]> => {
    try {
        const expenses = await IncomeModel.find({ userId }).exec();
        return expenses;
    } catch (error) {
        console.error(error);
        return [];
    }
}