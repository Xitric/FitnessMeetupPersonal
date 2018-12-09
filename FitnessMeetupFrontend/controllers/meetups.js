"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiFactory_1 = require("../src/api/ApiFactory");
const ensureProfile_1 = require("./middleware/ensureProfile");
const router = express_1.Router();
router.get('/new', ensureProfile_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.locals.title = 'New meetup';
    res.locals.sports = (yield ApiFactory_1.ApiFactory.createSportsApi().getAllSports()).body;
    res.render('newMeetup', res.locals);
}));
router.get('/:id/join', ensureProfile_1.default, (req, res) => {
    ApiFactory_1.ApiFactory.createMeetupsApi(req.user.accessToken).addParticipant(req.params.id, res.locals.profile).then(result => {
        res.redirect('/meetups/' + req.params.id);
    });
});
router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    //TODO: Check everywhere that we use ids from the url if the input is safe?
    res.locals.meetup = (yield ApiFactory_1.ApiFactory.createMeetupsApi().getMeetup(req.params.id)).body;
    res.locals.title = res.locals.meetup.title;
    if (res.locals.profile) {
        if (res.locals.meetup.participants.find(value => value.id === res.locals.profile.id)) {
            res.locals.participates = true;
        }
    }
    res.render('meetupDetails', res.locals);
}));
router.get('/', ((req, res) => __awaiter(this, void 0, void 0, function* () {
    let sport = req.query.sport;
    if (!/^[a-zA-Z]+$/.test(sport)) {
        sport = undefined;
    }
    res.locals.meetups = (yield ApiFactory_1.ApiFactory.createMeetupsApi().getUpcomingMeetups(0, 20, sport)).body;
    res.locals.sports = (yield ApiFactory_1.ApiFactory.createSportsApi().getAllSports()).body;
    res.locals.title = "Upcoming meetups";
    res.render('meetups', res.locals);
})));
exports.MeetupsController = router;
//# sourceMappingURL=meetups.js.map