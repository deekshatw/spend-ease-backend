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
            description: transaction.description,
            date: transaction.date,
            userId: transaction.userId,
            categoryId: transaction.categoryId,
            transactionType: transaction.transactionType
        });
        console.log(created);
        return created ? 'success' : 'error';
    } catch (error) {
        console.error(error);
        return 'error';
    }
}

export const getAllTransactionsOfOneUserRepository = async (
    userId: number,
    filters: FilterOptions = {}
): Promise<any[]> => {  // Return any[] to accommodate mixed transaction and category data
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

        // Find all transactions based on the query
        const transactions = await TransactionModel.find(query).sort({ date: -1 }).exec();
        console.log("Unsorted transactions:", transactions);

        // For each transaction, fetch the associated category
        const result = await Promise.all(transactions.map(async (transaction) => {
            const category = await CategoryModel.findOne({ categoryId: transaction.categoryId }).exec();
            return {
                transactionId: transaction.transactionId,
                amount: transaction.amount,
                description: transaction.description,
                date: transaction.date,
                userId: transaction.userId,
                category: category ? {
                    categoryId: category.categoryId,
                    name: category.name,
                    description: category.description
                } : null,  // Handle case where the category is not found
                transactionType: transaction.transactionType,
            };
        }));

        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
};


interface FilterOptions {
    startDate?: Date;
    endDate?: Date;
    type?: 'income' | 'expense' | 'all';
}