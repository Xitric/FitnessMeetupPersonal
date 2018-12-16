import {Request, Response, NextFunction} from "express";

// middleware to prevent users from logging in if they already authenticated
export default function loginBlock(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
        return next();
    }
    res.redirect("/");
}
