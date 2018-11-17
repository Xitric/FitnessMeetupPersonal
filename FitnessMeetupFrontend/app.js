"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const passport = require("passport");
const passport_auth0_1 = require("passport-auth0");
const controllers_1 = require("./controllers");
const app = express();
//Express session
const session = {
    secret: '7BFB6ogkpX%P614BngqL^tzYV3x*4al8FPnlUDTaBR7Vj8j5^q&E*dFk2Mmv5V^G',
    resave: false,
    saveUninitialized: false,
    cookie: {}
};
if (app.get('env') === 'production') {
    session.cookie.secure = true;
}
app.use(expressSession(session));
//Passport Auth0
var strategy = new passport_auth0_1.Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: '/callback'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
});
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
//TODO: User interface
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Controllers
app.use('/', controllers_1.HomeController);
app.use('/', controllers_1.AuthenticationController);
app.use('/meetups', controllers_1.MeetupsController);
app.use('/user', controllers_1.UserController);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(error(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
//# sourceMappingURL=app.js.map