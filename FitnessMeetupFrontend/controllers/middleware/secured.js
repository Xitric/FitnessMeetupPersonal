"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function secured(req, res, next) {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
}
exports.default = secured;
//# sourceMappingURL=secured.js.map