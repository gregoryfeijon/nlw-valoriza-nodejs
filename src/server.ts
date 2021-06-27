import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import { router } from "./routes";

import "./database";
import { errorHandler } from "./shared/utils/ErrorHandler";
import { BaseError } from "./exceptions/BaseError";

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(async (err: Error, request: Request, response: Response, next: NextFunction) => {
    await errorHandler.handleError(err);
    if (!errorHandler.isTrustedError(err)) {
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
    return response.status((err as BaseError).httpCode).json({
        error: err.message
    });
});

app.listen(3000, () => console.log("Server is running"));