import { Request, Response } from "express";
import { createCategoryRepository, getCategoriesListRepository } from "../repositories/category.repository";

export const createCategoryController = async (req: Request, res: Response) => {
    const category = req.body;
    console.log(category);
    try {
        const response = await createCategoryRepository(category);
        console.log(response);
        if (response === 'exists') {
            res.status(409).json({
                "success": false,
                "message": "This category already exists!"
            });
        } else if (response === 'success') {
            res.status(201).json({
                "success": true,
                "message": "Category created successfully"
            });
        }
        else {
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

export const getCategoriesListController = async (req: Request, res: Response) => {
    try {
        const categories = await getCategoriesListRepository();
        res.status(200).json({
            "success": true,
            "categories": categories.map(category => {
                return {
                    "categoryId": category.categoryId,
                    "name": category.name,
                    "description": category.description
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