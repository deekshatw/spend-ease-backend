import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserInterface } from "../database/interfaces/user.interface";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Assumes "Bearer <token>"

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err); // Debugging
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        // Debugging: log the decoded user
        console.log('Decoded user:', user);

        // Attach user object to request
        req.user = user as UserInterface;
        next(); // Proceed to the next middleware or route handler
    });
};
