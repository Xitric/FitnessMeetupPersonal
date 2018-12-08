"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiFactory_1 = require("../src/api/ApiFactory");
const router = express_1.Router();
router.get('/', (req, res) => {
    ApiFactory_1.ApiFactory.createMeetupsApi().getUpcomingMeetups().then(result => {
        res.locals.title = "Fitness Meetup";
        res.locals.meetups = result.body;
        res.render('index', res.locals);
    });
});
exports.HomeController = router;
//# sourceMappingURL=home.js.map