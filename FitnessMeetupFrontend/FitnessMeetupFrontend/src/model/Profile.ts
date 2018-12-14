import auth0 = require("passport-auth0");

export interface Profile extends auth0.Profile {
    picture: string;
}