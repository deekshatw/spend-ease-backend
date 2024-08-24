import { Request, Response } from "express";
import { createUserRepository, loginUserRepository } from "../repositories/auth.repository";
import { generateJwtToken } from "../services/jwt_token.service";

export const createUserController = async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const user = await createUserRepository(body);
        if (user) {
            res.status(200).json({
                "success": true,
                "message": "User created successfully"
            });
        } else {
            res.status(500).json({
                "success": false,
                "message": "Internal server error"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": error
        });
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await loginUserRepository(email, password);
        if (user) {
            const token = generateJwtToken(user);


            res.status(200).json({
                "success": true,
                "message": "User logged in successfully",
                "user": {
                    "token": token,
                    "userId": user.userId,
                    "name": user.name,
                    "email": user.email,
                    "createdAt": user.createdAt,

                }
            });
        } else {
            res.status(401).json({
                "success": false,
                "message": "User not found!"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": error
        });
    }
}