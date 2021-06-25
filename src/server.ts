import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";
import { errorHandler } from "./shared/utils/ErrorHandler";

const app = express();

app.use(express.json());

app.use(router);

app.use(async (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (!errorHandler.isTrustedError(err)) {
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
    await errorHandler.handleError(err);
    return response.status(400).json({
        error: err.message
    });
});

app.listen(3000, () => console.log("Server is running"));