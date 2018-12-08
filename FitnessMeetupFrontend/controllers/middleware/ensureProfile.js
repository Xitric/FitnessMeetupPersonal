"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureProfile(req, res, next) {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
}
exports.default = ensureProfile;
//# sourceMappingURL=ensureProfile.js.map