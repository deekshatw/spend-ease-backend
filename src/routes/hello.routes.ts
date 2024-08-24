import { Router } from "express";

const helloRouter = Router();


helloRouter.get("/", (req, res) => {
    res.json({
        "success": true,
        "message": "Hello World"
    });
});

export default helloRouter;