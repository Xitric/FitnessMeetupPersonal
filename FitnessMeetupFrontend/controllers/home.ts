import {Router, Request, Response} from 'express';
import {ApiFactory} from "../src/api/ApiFactory";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    ApiFactory.createMeetupsApi().getUpcomingMeetups().then(result => {
        res.locals.title = "Fitness Meetup";
        res.locals.meetups = result.body;
        res.render('index', res.locals);
    });
});

export const HomeController = router;
