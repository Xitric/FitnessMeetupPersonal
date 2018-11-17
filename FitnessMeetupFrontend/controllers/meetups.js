"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../src/api");
const router = express_1.Router();
const meetupsApi = new api_1.MeetupsApi('https://localhost:44381/v1');
const sportsApi = new api_1.SportsApi('https://localhost:44381/v1');
router.get('/new-meetup', (req, res) => {
    sportsApi.getAllSports().then(({ body }) => {
        res.render('newMeetup', { sports: body });
    });
});
router.get('/:id', (req, res) => {
    meetupsApi.getMeetup(req.params.id).then(({ body }) => {
        res.render('meetupDetails', { meetup: body });
    });
});
exports.MeetupsController = router;
//# sourceMappingURL=meetups.js.map