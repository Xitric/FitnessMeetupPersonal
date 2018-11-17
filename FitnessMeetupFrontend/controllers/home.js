"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MeetupsRepository_1 = require("../src/database/MeetupsRepository");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.render('index', { title: 'Fitness Meetup' });
    MeetupsRepository_1.default.getMeetup(1).then(meetup => {
        console.log(meetup);
    });
});
exports.HomeController = router;
//# sourceMappingURL=home.js.map