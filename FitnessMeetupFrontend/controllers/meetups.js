"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiFactory_1 = require("../src/api/ApiFactory");
const ensureProfile_1 = require("./middleware/ensureProfile");
const router = express_1.Router();
router.get('/new-meetup', (req, res) => {
    // sportsApi.getAllSports().then(({body}) => {
    //     res.render('newMeetup', {sports: body});
    // })
    res.send('Not implemented yet');
});
router.get('/:id/join', ensureProfile_1.default, (req, res) => {
    ApiFactory_1.ApiFactory.createMeetupsApi(req.user.accessToken).addParticipant(req.params.id, res.locals.profile).then(result => {
        res.redirect('/meetups/' + req.params.id);
    });
});
router.get('/:id', (req, res) => {
    ApiFactory_1.ApiFactory.createMeetupsApi().getMeetup(req.params.id).then(result => {
        res.locals.title = result.body.title;
        res.locals.meetup = result.body;
        if (res.locals.profile) {
            if (res.locals.meetup.participants.find(value => value.id === res.locals.profile.id)) {
                res.locals.participates = true;
            }
        }
        res.render('meetupDetails', res.locals);
    });
});
exports.MeetupsController = router;
//# sourceMappingURL=meetups.js.map