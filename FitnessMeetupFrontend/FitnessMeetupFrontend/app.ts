import debug = require("debug");
import express = require("express");
import path = require("path");
import expressSession = require("express-session");
import passport = require("passport");
import hbs = require("express-handlebars");

import { Express, Request, Response, NextFunction } from "express";
import { SessionOptions } from "express-session";
import { Strategy, ExtraVerificationParams } from "passport-auth0";
import { Server } from "http";
import { User } from "./src/api/api";
import { ApiFactory } from "./src/api/ApiFactory";
import { Profile } from "./src/model/Profile";

import index from "./routes/index";
import authentication from "./routes/authentication";
import users from "./routes/users";
import meetups from "./routes/meetups";

const app: Express = express();

// express session
const session: SessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {}
};

// we ensure that cookies are safe in production, and that we do not need https in development
if (app.get("env") === "production") {
    session.cookie.secure = true;
    session.cookie.httpOnly = true;
    // this helps mitigate CSRF attacks. The cookie is allowed to be sent when following links, but
    // only for GET requests that should have no side effects! A CSRF 'attack' that merely displays
    // a page to a user is quite harmless.
    session.cookie.sameSite = "lax";
}

app.use(expressSession(session));

// passport Auth0
const strategy: Strategy = new Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL + "/callback"
}, function (accessToken: string, refreshToken: string, extraParams: ExtraVerificationParams, profile: Profile, done: any): void {
    const id: string = profile.id;
    const name: string = profile.displayName;
    const emails: string[] = profile.emails.map(element => element.value);
    const email: string = emails.length >= 1 ? emails[0] : "";
    const picture: string = profile.picture;
    const user: User = {
        id: id,
        name: name,
        email: email,
        profilePicture: picture
    };

    ApiFactory.createUsersApi(accessToken).addUser(user).catch(error => {
        console.log(error);
    });
    return done(null, { profile: user, accessToken: accessToken, refreshToken: refreshToken });
});

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// todo: user interface
passport.serializeUser<any, any>(function (user: any, done: any): void {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any): void {
    done(null, user);
});

app.use(function (req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
        res.locals.profile = req.user.profile;
    }
    next();
});

// view engine setup
app.engine("hbs", hbs({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/partials"
}));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", index);
app.use("/", authentication);
app.use("/users", users);
app.use("/meetups", meetups);

// catch 404 and forward to error handler
app.use(function (_req: Request, res: Response, next: NextFunction): void {
    const err: Error = new Error("Not Found");
    res.status(404);
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, _req: Request, res: Response) => {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

app.set("port", process.env.PORT || 3000);

const server: Server = app.listen(app.get("port"), function (): void {
    debug("Express server listening on port " + server.address().port);
});
