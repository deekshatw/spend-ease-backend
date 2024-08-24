"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRoute = (0, express_1.Router)();
authRoute.post("/register", auth_controller_1.createUserController);
authRoute.post("/login", auth_controller_1.loginUserController);
exports.default = authRoute;
