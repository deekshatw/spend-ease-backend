import { Request, Response } from "express";
import { createUserRepository } from "../repositories/auth.repository";

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