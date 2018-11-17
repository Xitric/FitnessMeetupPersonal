import {Request, Response, NextFunction} from 'express';

export default function loginBlock(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        return next();
    }
    res.redirect('/');
}
