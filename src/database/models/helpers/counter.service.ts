import CategoryCounter from "./category_counter.schema";
import UserCounter from "./counter.schema";

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