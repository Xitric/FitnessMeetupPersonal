//From: https://auth0.com/docs/quickstart/webapp/nodejs/01-login
import {Router, Request, Response, NextFunction} from 'express';
import passport = require('passport');
import loginBlock from './middleware/loginBlocker';

const router = Router();

// @ts-ignore
router.get('/login', loginBlock, passport.authenticate('auth0', {audience: 'https://fitnessmeetupkasper.azurewebsites.net', scope: 'openid email profile'}), function (req: Request, res: Response, next: NextFunction) {
    res.redirect('/');
});

router.get('/callback', function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate('auth0', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            console.log(user);
            console.log(err);
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || '/users/me');
        });
    })(req, res, next);
});

router.get('/logout', function (req: Request, res: Response) {
    req.logout();
    res.redirect('https://fitness-meetup.eu.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000/');
});

export const AuthenticationController = router;
