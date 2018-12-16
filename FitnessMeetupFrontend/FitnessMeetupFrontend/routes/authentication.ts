// adapted from: https://auth0.com/docs/quickstart/webapp/nodejs/01-login
import passport = require("passport");

import { Router, Request, Response, NextFunction } from "express";
import loginBlock from "./middleware/loginBlocker";

const router: Router = Router();

router.get("/login",
    loginBlock,
    passport.authenticate("auth0", {
        // @ts-ignore
        audience: "https://fitnessmeetupkasper.azurewebsites.net",
        scope: "openid email profile write:meetups write:profile"
    }),
    (_req: Request, res: Response) => {
        res.redirect("/");
    });

router.get("/callback", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("auth0", (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            let passportSession = req.session.passport;
            req.session.regenerate(err => {
                if (err) {
                    res.redirect("/logout");
                }
                req.session.passport = passportSession;
                res.redirect("/users/me");
            });
        });
    })(req, res, next);
});

router.get("/logout", (req: Request, res: Response) => {
    req.logout();
    req.session.destroy(err => {
        if (!err) {
            res.clearCookie("fitnessSession");
            res.redirect("https://fitness-meetup.eu.auth0.com/v2/logout?returnTo=" + process.env.AUTH0_CALLBACK_URL);
        }
    });
});

export default router;
