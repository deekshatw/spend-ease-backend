import jwt from 'jsonwebtoken';
import { UserInterface } from '../database/interfaces/user.interface';


export const generateJwtToken = (user: UserInterface): string => {
    const JWT_SECRET = process.env.JWT_SECRET_KEY
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET not found");
    }
    return jwt.sign({ userId: user.userId, email: user.email }, JWT_SECRET);
};