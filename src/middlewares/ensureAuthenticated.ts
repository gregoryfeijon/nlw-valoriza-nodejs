import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({
            "message": "Unauthorized. Token is missing"
        });
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(
            token,
            JWT_SECRET_KEY
        ) as IPayload;

        req.user_id = sub;

    } catch (err) {
        return res.status(401).json({
            "message": "Unauthorized. Token is missing"
        });
    }
    return next();
}