import { Router } from "express";
import { createCategoryController, getCategoriesListController } from "../controllers/category.controller";

const categoryRoute = Router();

categoryRoute.post('/create', createCategoryController);
categoryRoute.get('/list', getCategoriesListController);

export default categoryRoute;