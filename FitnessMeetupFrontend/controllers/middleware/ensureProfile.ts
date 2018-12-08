//From: https://auth0.com/docs/quickstart/webapp/nodejs/01-login
import {Request, Response, NextFunction} from 'express';

export default function ensureProfile(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
}
