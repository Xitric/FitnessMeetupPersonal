"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensureProfile_1 = require("./middleware/ensureProfile");
const ApiFactory_1 = require("../src/api/ApiFactory");
const router = express_1.Router();
router.get('/me', ensureProfile_1.default, (req, res) => {
    res.redirect('/users/' + res.locals.profile.id);
});
router.get('/:id', (req, res) => {
    ApiFactory_1.ApiFactory.createUsersApi().getUser(req.params.id).then(result => {
        res.locals.profile = result.body;
        res.locals.title = res.locals.profile.name;
        res.render('profile', res.locals);
    });
});
exports.UserController = router;
//# sourceMappingURL=user.js.map