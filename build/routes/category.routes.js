"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const categoryRoute = (0, express_1.Router)();
categoryRoute.post('/create', category_controller_1.createCategoryController);
categoryRoute.get('/list', category_controller_1.getCategoriesListController);
exports.default = categoryRoute;
