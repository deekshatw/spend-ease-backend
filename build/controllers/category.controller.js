"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesListController = exports.createCategoryController = void 0;
const category_repository_1 = require("../repositories/category.repository");
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body;
    console.log(category);
    try {
        const response = yield (0, category_repository_1.createCategoryRepository)(category);
        console.log(response);
        if (response === 'exists') {
            res.status(409).json({
                "success": false,
                "message": "This category already exists!"
            });
        }
        else if (response === 'success') {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": error
        });
    }
});
exports.createCategoryController = createCategoryController;
const getCategoriesListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_repository_1.getCategoriesListRepository)();
        res.status(200).json({
            "success": true,
            "categories": categories.map(category => {
                return {
                    "categoryId": category.categoryId,
                    "name": category.name,
                    "description": category.description
                };
            })
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": error
        });
    }
});
exports.getCategoriesListController = getCategoriesListController;
