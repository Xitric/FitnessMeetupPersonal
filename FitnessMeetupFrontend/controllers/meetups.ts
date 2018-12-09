import {Router, Request, Response} from 'express';
import {ApiFactory} from "../src/api/ApiFactory";
import ensureProfile from "./middleware/ensureProfile";

const router = Router();

router.get('/new', ensureProfile, async (req: Request, res: Response) => {
    res.locals.title = 'New meetup';
    res.locals.sports = (await ApiFactory.createSportsApi().getAllSports()).body;
    res.render('newMeetup', res.locals);
});

router.get('/:id/join', ensureProfile, (req: Request, res: Response) => {
    ApiFactory.createMeetupsApi(req.user.accessToken).addParticipant(req.params.id, res.locals.profile).then(result => {
        res.redirect('/meetups/' + req.params.id);
    });
});

router.get('/:id', async (req: Request, res: Response) => {
    //TODO: Check everywhere that we use ids from the url if the input is safe?
    res.locals.meetup = (await ApiFactory.createMeetupsApi().getMeetup(req.params.id)).body;
    res.locals.title = res.locals.meetup.title;

    if (res.locals.profile) {
        if (res.locals.meetup.participants.find(value => value.id === res.locals.profile.id)) {
            res.locals.participates = true;
        }
    }

    res.render('meetupDetails', res.locals);
});

router.get('/', (async (req: Request, res: Response) => {
    let sport = req.query.sport;
    if (! /^[a-zA-Z]+$/.test(sport)) {
        sport = undefined;
    }

    res.locals.meetups = (await ApiFactory.createMeetupsApi().getUpcomingMeetups(0, 20, sport)).body;
    res.locals.sports = (await ApiFactory.createSportsApi().getAllSports()).body;
    res.locals.title = "Upcoming meetups";
    res.render('meetups', res.locals);
}));

export const MeetupsController = router;
