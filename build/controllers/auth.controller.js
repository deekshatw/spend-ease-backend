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
exports.loginUserController = exports.createUserController = void 0;
const auth_repository_1 = require("../repositories/auth.repository");
const jwt_token_service_1 = require("../services/jwt_token.service");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield (0, auth_repository_1.createUserRepository)(body);
        if (user) {
            res.status(200).json({
                "success": true,
                "message": "User created successfully"
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
exports.createUserController = createUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, auth_repository_1.loginUserRepository)(email, password);
        if (user) {
            const token = (0, jwt_token_service_1.generateJwtToken)(user);
            res.status(200).json({
                "success": true,
                "message": "User logged in successfully",
                "user": {
                    "token": token,
                    "userId": user.userId,
                    "name": user.name,
                    "email": user.email,
                    "createdAt": user.createdAt,
                }
            });
        }
        else {
            res.status(401).json({
                "success": false,
                "message": "User not found!"
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
exports.loginUserController = loginUserController;
