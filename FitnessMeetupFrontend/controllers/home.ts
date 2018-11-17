import {Router, Request, Response} from 'express';
import meetups from '../src/database/MeetupsRepository';
import users from '../src/database/UsersRepository';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.render('index', {title: 'Fitness Meetup'});
    meetups.getMeetup(1).then(meetup => {
        console.log(meetup);
    });
});

export const HomeController = router;
