import { Request, Response } from "express";
import { createIncomeRepository, getAllIncomesOfOneUserRepository } from "../repositories/income.repository";

export const createIncomeController = async (req: Request, res: Response) => {
    const income = req.body;
    console.log(income);
    try {
        const response = await createIncomeRepository(income);
        console.log(response);
        if (response === 'success') {
            res.status(201).json({
                "success": true,
                "message": "Income created successfully"
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
};

export const getAllIncomesOfOneUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    console.log(userId);
    if (!userId) {
        res.status(400).json({ success: false, message: "User ID not found" });
    }
    try {
        const incomes = await getAllIncomesOfOneUserRepository(userId!);
        res.status(200).json({
            "success": true,
            "data": incomes.map(income => {
                return {
                    "incomeId": income.incomeId,
                    "amount": income.amount,
                    "description": income.description,
                    "date": income.date,
                    "userId": income.userId,
                    "categoryId": income.categoryId
                }
            })
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": error
        });
    }
};