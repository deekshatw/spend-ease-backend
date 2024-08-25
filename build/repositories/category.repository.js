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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesListRepository = exports.createCategoryRepository = void 0;
const category_model_1 = __importDefault(require("../database/models/category.model"));
const counter_service_1 = require("../database/models/helpers/counter.service");
const createCategoryRepository = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAlreadyExists = yield category_model_1.default.findOne({ name: category.name });
        if (isAlreadyExists) {
            return 'exists';
        }
        else {
            const categoryId = yield (0, counter_service_1.getNextCategoryId)();
            const created = yield category_model_1.default.create({
                categoryId,
                name: category.name,
                description: category.description
            });
            return created ? 'success' : 'error';
        }
    }
    catch (error) {
        console.error(error);
        return 'error';
    }
});
exports.createCategoryRepository = createCategoryRepository;
const getCategoriesListRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.default.find({});
        return categories;
    }
    catch (error) {
        return [];
    }
});
exports.getCategoriesListRepository = getCategoriesListRepository;
