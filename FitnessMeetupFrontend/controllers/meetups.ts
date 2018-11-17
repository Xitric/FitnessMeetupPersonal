import {Router, Request, Response} from 'express';
import {MeetupsApi, SportsApi} from '../src/api';

const router = Router();
const meetupsApi = new MeetupsApi('https://localhost:44381/v1');
const sportsApi = new SportsApi('https://localhost:44381/v1');

router.get('/new-meetup', (req: Request, res: Response) => {
    sportsApi.getAllSports().then(({body}) => {
        res.render('newMeetup', {sports: body});
    })
});

router.get('/:id', (req: Request, res: Response) => {
    meetupsApi.getMeetup(req.params.id).then(({body}) => {
        res.render('meetupDetails', {meetup: body});
    });
});

export const MeetupsController = router;
