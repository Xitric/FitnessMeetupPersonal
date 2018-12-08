"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensureProfile_1 = require("./middleware/ensureProfile");
const router = express_1.Router();
router.get('/', ensureProfile_1.default, (req, res) => {
    res.locals.title = res.locals.profile.name;
    res.render('profile', res.locals);
});
exports.UserController = router;
//# sourceMappingURL=user.js.map