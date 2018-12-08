"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//A class to provide helper methods for more easily using the generated api code
const apis_1 = require("./api/apis");
class ApiFactory {
    static createMeetupsApi(accessToken) {
        let meetups = new apis_1.MeetupsApi(process.env.BACKEND_API);
        if (accessToken)
            meetups.accessToken = accessToken;
        return meetups;
    }
    static createSportsApi(accessToken) {
        let sports = new apis_1.SportsApi(process.env.BACKEND_API);
        if (accessToken)
            sports.accessToken = accessToken;
        return sports;
    }
    static createUsersApi(accessToken) {
        let users = new apis_1.UsersApi(process.env.BACKEND_API);
        if (accessToken)
            users.accessToken = accessToken;
        return users;
    }
}
exports.ApiFactory = ApiFactory;
//# sourceMappingURL=ApiFactory.js.map