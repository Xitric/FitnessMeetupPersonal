"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/new-meetup', (req, res) => {
    // sportsApi.getAllSports().then(({body}) => {
    //     res.render('newMeetup', {sports: body});
    // })
});
router.get('/:id', (req, res) => {
    // meetupsApi.getMeetup(req.params.id).then(({body}) => {
    //     res.render('meetupDetails', {meetup: body});
    // });
});
exports.MeetupsController = router;
//# sourceMappingURL=meetups.js.map