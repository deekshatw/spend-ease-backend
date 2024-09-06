import { Request, Response } from "express";
import { createBudgetRepository, getBudgetsListRepository } from "../repositories/budget.repository";

export const createBudgetController = async (req: Request, res: Response): Promise<void> => {
    const budget = req.body;

    try {
        const response = await createBudgetRepository(budget);
        if (response === 'exists') {
            res.status(409).json({
                "success": false,
                "message": "This budget already exists!"
            });
        } else if (response == 'success') {
            res.status(201).json({
                "success": true,
                "message": "Budget created successfully"
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

export const getAllBudgetsOfOneUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        res.status(400).json({ success: false, message: "User ID not found" });
    }

    try {
        const budgets = await getBudgetsListRepository(userId!);
        res.status(200).json({
            "success": true,
            "data": budgets
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": error
        });
    }
};