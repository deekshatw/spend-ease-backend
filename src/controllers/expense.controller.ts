import { Request, Response } from "express";
import { createExpenseRepository, getAllExpensesOfOneUserRepository } from "../repositories/expense.repository";

export const createExpenseController = async (req: Request, res: Response): Promise<void> => {
    const expense = req.body;
    console.log(expense);
    try {
        const response = await createExpenseRepository(expense);
        console.log(response);
        if (response === 'success') {
            res.status(201).json({
                "success": true,
                "message": "Expense created successfully"
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

export const getAllExpensesOfOneUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    console.log(userId);
    if (!userId) {
        res.status(400).json({ success: false, message: "User ID not found" });
    }
    try {
        const expenses = await getAllExpensesOfOneUserRepository(userId!);
        res.status(200).json({
            "success": true,
            "data": expenses.map(expense => {
                return {
                    "expenseId": expense.expenseId,
                    "amount": expense.amount,
                    "description": expense.description,
                    "date": expense.date,
                    "userId": expense.userId,
                    "categoryId": expense.categoryId
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