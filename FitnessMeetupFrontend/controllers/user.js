"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const secured_1 = require("./middleware/secured");
const api_1 = require("./../src/api");
const router = express_1.Router();
router.get('/', secured_1.default, (req, res) => {
    let users = new api_1.UsersApi('https://localhost:44381/v1');
    users.accessToken = req.user.accessToken;
    users.getUser('110786492158656662718').then(value => {
        console.log(value);
        res.send(req.user);
    });
});
exports.UserController = router;
//# sourceMappingURL=user.js.map