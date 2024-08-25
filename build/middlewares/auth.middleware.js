"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]; // Assumes "Bearer <token>"
    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err); // Debugging
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        // Debugging: log the decoded user
        console.log('Decoded user:', user);
        // Attach user object to request
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};
exports.authenticateToken = authenticateToken;
