import { UserInterface } from "../database/interfaces/user.interface";
import { getNextUserId } from "../database/models/helpers/counter.service";
import userModel from "../database/models/user.model";
import bcrypt from "bcryptjs";


export const createUserRepository = async (userData: Omit<UserInterface, 'createdAt'>): Promise<string> => {
    const { name, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 12);

    try {


        const isAlreadyExists = await userModel.findOne({ email });

        if (isAlreadyExists) {
            return 'exists';

        } else {
            const userId = await getNextUserId();

            const created = await userModel.create(
                {
                    userId,
                    name,
                    email,
                    password: hashedPassword
                }
            );
            return created ? 'success' : 'error';
        }
    } catch (error) {
        return "error";
    }
};

export const loginUserRepository = async (email: string, password: string): Promise<UserInterface | null> => {
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;

    } catch (error) {
        return null;
    }
};