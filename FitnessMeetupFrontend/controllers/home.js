"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.render('index', { title: 'Fitness Meetup' });
    // meetups.getMeetup(1).then(meetup => {
    //     console.log(meetup);
    // });
});
exports.HomeController = router;
//# sourceMappingURL=home.js.map