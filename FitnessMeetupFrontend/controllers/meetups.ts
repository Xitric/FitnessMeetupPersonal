import {Router, Request, Response} from 'express';

const router = Router();

router.get('/new-meetup', (req: Request, res: Response) => {
    // sportsApi.getAllSports().then(({body}) => {
    //     res.render('newMeetup', {sports: body});
    // })
});

router.get('/:id', (req: Request, res: Response) => {
    // meetupsApi.getMeetup(req.params.id).then(({body}) => {
    //     res.render('meetupDetails', {meetup: body});
    // });
});

export const MeetupsController = router;
