// from: https://auth0.com/docs/quickstart/webapp/nodejs/01-login
import {Request, Response, NextFunction} from "express";

// middleware to block anonymous users from acessing routes that require profile information
export default function ensureProfile(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}
