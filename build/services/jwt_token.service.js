"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET not found");
    }
    return jsonwebtoken_1.default.sign({ userId: user.userId, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};
exports.generateJwtToken = generateJwtToken;
