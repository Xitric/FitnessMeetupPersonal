import {Router, Request, Response} from 'express';
import {ApiFactory} from "../src/api/ApiFactory";
import ensureProfile from "./middleware/ensureProfile";
import {User} from "../src/api/model/user";

const router = Router();

router.get('/new-meetup', (req: Request, res: Response) => {
    // sportsApi.getAllSports().then(({body}) => {
    //     res.render('newMeetup', {sports: body});
    // })
    res.send('Not implemented yet');
});

router.get('/:id/join', ensureProfile, (req: Request, res: Response) => {
    ApiFactory.createMeetupsApi(req.user.accessToken).addParticipant(req.params.id, res.locals.profile).then(result => {
        res.redirect('/meetups/' + req.params.id);
    });
});

router.get('/:id', (req: Request, res: Response) => {
    ApiFactory.createMeetupsApi().getMeetup(req.params.id).then(result => {
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

export const MeetupsController = router;
