import { UserInterface } from "../database/interfaces/user.interface";
import userModel from "../database/models/user.model";

export const createUserRepository = async (user: UserInterface): Promise<boolean> => {
    try {
        const created = await userModel.create(user);
        return created ? true : false;
    } catch (error) {
        return false;
    }
};