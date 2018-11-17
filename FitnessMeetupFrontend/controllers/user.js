"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const secured_1 = require("./middleware/secured");
const router = express_1.Router();
router.get('/', secured_1.default, (req, res) => {
    res.send(req.user);
});
exports.UserController = router;
//# sourceMappingURL=user.js.map