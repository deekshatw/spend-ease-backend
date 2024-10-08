"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const hello_routes_1 = __importDefault(require("./hello.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const transaction_routes_1 = __importDefault(require("./transaction.routes"));
const budget_routes_1 = __importDefault(require("./budget.routes"));
exports.router = (0, express_1.Router)();
exports.router.use('/hello', hello_routes_1.default);
exports.router.use('/auth', auth_routes_1.default);
exports.router.use('/category', category_routes_1.default);
exports.router.use('/transaction', transaction_routes_1.default);
exports.router.use('/budget', budget_routes_1.default);
