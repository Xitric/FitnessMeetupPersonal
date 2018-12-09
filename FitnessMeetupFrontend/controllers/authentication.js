"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//From: https://auth0.com/docs/quickstart/webapp/nodejs/01-login
const express_1 = require("express");
const passport = require("passport");
const loginBlocker_1 = require("./middleware/loginBlocker");
const router = express_1.Router();
// @ts-ignore
router.get('/login', loginBlocker_1.default, passport.authenticate('auth0', { audience: 'https://fitnessmeetupkasper.azurewebsites.net', scope: 'openid email profile' }), function (req, res, next) {
    res.redirect('/');
});
router.get('/callback', function (req, res, next) {
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
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('https://fitness-meetup.eu.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000/');
});
exports.AuthenticationController = router;
//# sourceMappingURL=authentication.js.map