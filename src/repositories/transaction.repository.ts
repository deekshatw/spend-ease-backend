import { TransactionInterface } from "../database/interfaces/transaction.interface";
import CategoryModel from "../database/models/category.model";
import { getNextTransactionId } from "../database/models/helpers/counter.service";
import TransactionModel from "../database/models/transaction.model";
export const createTransactionRepository = async (transaction: TransactionInterface): Promise<string> => {
    try {
        const transactionId = await getNextTransactionId();
        const created = await TransactionModel.create({
            transactionId: transactionId,
            amount: transaction.amount,
            title: transaction.title,
            description: transaction.description,
            date: transaction.date,
            userId: transaction.userId,
            categoryId: transaction.categoryId,
            transactionType: transaction.transactionType
        });
        return created ? 'success' : 'error';
    } catch (error) {
        console.error(error);
        return 'error';
    }
}

export const getAllTransactionsOfOneUserRepository = async (
    userId: number,
    filters: FilterOptions = {}
): Promise<any[]> => {
    try {
        const query: any = { userId };
        if (filters.startDate || filters.endDate) {
            query.date = {};
            if (filters.startDate) {
                query.date.$gte = filters.startDate;
            }
            if (filters.endDate) {
                query.date.$lte = filters.endDate;
            }
        }
        if (filters.type) {
            query.transactionType = filters.type;
        }

        const transactions = await TransactionModel.find(query).sort({ date: -1, createdAt: -1 }).exec();

        const result = await Promise.all(transactions.map(async (transaction) => {
            const category = await CategoryModel.findOne({ categoryId: transaction.categoryId }).exec();
            return {
                transactionId: transaction.transactionId,
                amount: transaction.amount,
                title: transaction.title,
                description: transaction.description,
                date: transaction.date,
                // userId: transaction.userId,
                category: category ? {
                    categoryId: category.categoryId,
                    name: category.name,
                    description: category.description
                } : null,
                transactionType: transaction.transactionType,
            };
        }));

        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getUserTransactionSummaryRepository = async (userId: string): Promise<{ income: number, expense: number, balance: number }> => {
    try {
        const result = await TransactionModel.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ["$transactionType", "income"] }, "$amount", 0]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ["$transactionType", "expense"] }, "$amount", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    income: "$totalIncome",
                    expense: "$totalExpense",
                    balance: { $subtract: ["$totalIncome", "$totalExpense"] }
                }
            }
        ]);

        if (result.length > 0) {
            const summary = result[0];
            return summary;
        } else {
            return { income: 0, expense: 0, balance: 0 };
        }
    } catch (error) {
        return { income: 0, expense: 0, balance: 0 };
    }
};



interface FilterOptions {
    startDate?: Date;
    endDate?: Date;
    type?: 'income' | 'expense' | 'all';
}