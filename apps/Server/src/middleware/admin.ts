import * as dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];
    const JWT_PASSWORD = process.env.JWT_SECRET || "secret";
    
    if (!token) {
        res.status(403).json({message: "Unauthorized"})
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as { role: string, userId: string }
        if (decoded.role !== "Admin") {
            res.status(403).json({message: "Unauthorized"})
            return;
        }
        req.userId = decoded.userId
        next()
    } catch(e) {
        res.status(401).json({message: "Unauthorized"})
        return
    }
}