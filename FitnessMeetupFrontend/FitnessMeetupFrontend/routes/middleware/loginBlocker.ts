import {Request, Response, NextFunction} from "express";

// middleware to prevent users from logging in if they already authenticated
// this middleware is intended to fix some bugs I had previously
export default function loginBlock(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
        return next();
    }
    res.redirect("/");
}
