import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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
            "eb3df084201994c2d9f7724f989d00d7"
        ) as IPayload;

        req.user_id = sub;

    } catch (err) {
        return res.status(401).json({
            "message": "Unauthorized. Token is missing"
        });
    }
    return next();
}