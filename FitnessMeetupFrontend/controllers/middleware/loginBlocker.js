"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loginBlock(req, res, next) {
    if (!req.user) {
        return next();
    }
    res.redirect('/');
}
exports.default = loginBlock;
//# sourceMappingURL=loginBlocker.js.map