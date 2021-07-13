import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocs from "../swagger.json";

import { router } from "./routes";

import "./database";
import { errorHandler } from "@utils/ErrorHandler";
import { BaseError } from "@exceptions/BaseError";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);

app.use(async (err: Error, request: Request, response: Response, next: NextFunction) => {
    await errorHandler.handleError(err);
    if (!errorHandler.isTrustedError(err)) {
        response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
    response.status((err as BaseError).httpCode).json({
        error: err.message
    });
    next(err);
});

app.listen(3000, () => console.log("Server is running"));