import * as error from 'http-errors';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import * as hbs from 'express-handlebars';

import {Strategy} from 'passport-auth0';
import {AuthenticationController, HomeController, MeetupsController, UserController} from './controllers';
import {SessionOptions} from 'express-session';
import {Express} from 'express';

const app: Express = express();

//Express session
const session: SessionOptions = {
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
var strategy: Strategy = new Strategy({
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
passport.serializeUser<any, any>(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// view engine setup
app.engine('hbs', hbs( {
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Controllers
app.use('/', HomeController);
app.use('/', AuthenticationController);
app.use('/meetups', MeetupsController);
app.use('/user', UserController);

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
