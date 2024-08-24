import UserCounter from "./counter.schema";

export const getNextUserId = async (): Promise<number> => {
    const sequenceDocument = await UserCounter.findByIdAndUpdate(
        { _id: 'userId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.sequence_value ?? 1;
};