// Import any existing types if needed

import { UserInterface } from "../database/interfaces/user.interface";

// Extend the global namespace for Express
declare global {
    namespace Express {
        interface Request {
            user?: UserInterface; // Add `user` property to the `Request` type
        }
    }
}
