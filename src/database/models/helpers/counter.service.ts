import CategoryCounter from "./category_counter.schema";
import UserCounter from "./counter.schema";
import ExpenseCounter from "./expense_counter.schema";

export const getNextUserId = async (): Promise<number> => {
    const sequenceDocument = await UserCounter.findByIdAndUpdate(
        { _id: 'userId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.sequence_value ?? 1;
};

export const getNextCategoryId = async (): Promise<string> => {
    const sequenceDocument = await CategoryCounter.findByIdAndUpdate(
        { _id: 'categoryId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    const sequenceValue = sequenceDocument.sequence_value ?? 1;
    const formattedCategoryId = `C-${sequenceValue.toString().padStart(2, '0')}`;
    return formattedCategoryId;
};

export const getNextExpenseId = async (): Promise<string> => {
    const sequenceDocument = await ExpenseCounter.findByIdAndUpdate(
        { _id: 'expenseId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    const sequenceValue = sequenceDocument.sequence_value ?? 1;
    const formattedExpenseId = `E-${sequenceValue.toString().padStart(2, '0')}`;
    console.log(formattedExpenseId);
    return formattedExpenseId;
};