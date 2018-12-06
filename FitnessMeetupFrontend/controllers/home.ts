import {Router, Request, Response} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.render('index', {title: 'Fitness Meetup'});
    // meetups.getMeetup(1).then(meetup => {
    //     console.log(meetup);
    // });
});

export const HomeController = router;
