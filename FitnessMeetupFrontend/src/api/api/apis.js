"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./meetupsApi"));
const meetupsApi_1 = require("./meetupsApi");
__export(require("./sportsApi"));
const sportsApi_1 = require("./sportsApi");
__export(require("./usersApi"));
const usersApi_1 = require("./usersApi");
exports.APIS = [meetupsApi_1.MeetupsApi, sportsApi_1.SportsApi, usersApi_1.UsersApi];
//# sourceMappingURL=apis.js.map