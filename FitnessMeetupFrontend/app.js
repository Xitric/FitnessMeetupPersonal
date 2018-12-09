"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const passport = require("passport");
const hbs = require("express-handlebars");
const passport_auth0_1 = require("passport-auth0");
const controllers_1 = require("./controllers");
const ApiFactory_1 = require("./src/api/ApiFactory");
const app = express();
//Express session
const session = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {} //TODO: Secure, HTTP Only, SameSite
};
//TODO: This might not be needed if the above is resolved
if (app.get('env') === 'production') {
    session.cookie.secure = true;
}
app.use(expressSession(session));
//Passport Auth0
let strategy = new passport_auth0_1.Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: '/callback'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let id = profile.id;
    let name = profile.displayName;
    let emails = profile.emails.map(element => element.value);
    let email = emails.length >= 1 ? emails[0] : '';
    let picture = profile['picture'];
    let user = { id: id,
        name: name,
        email: email,
        profilePicture: picture };
    ApiFactory_1.ApiFactory.createUsersApi(accessToken).addUser(user).catch(error => {
        console.log(error);
    });
    return done(null, { profile: user, accessToken: accessToken, refreshToken: refreshToken });
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
app.use(function (req, res, next) {
    if (req.user) {
        res.locals.profile = req.user.profile;
    }
    next();
});
// view engine setup
app.engine('hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views',
    partialsDir: __dirname + '/views/partials'
}));
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
app.use('/users', controllers_1.UserController);
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