import {Router, Request, Response} from 'express';
import ensureProfile from './middleware/ensureProfile';
import {ApiFactory} from "../src/api/ApiFactory";

const router = Router();

router.get('/me', ensureProfile, (req: Request, res: Response) => {
    res.redirect('/users/' + res.locals.profile.id);
});

router.get('/:id', (req: Request, res: Response) => {
    ApiFactory.createUsersApi().getUser(req.params.id).then(result => {
        res.locals.profile = result.body;
        res.locals.title = res.locals.profile.name;
        res.render('profile', res.locals);
    });
});

export const UserController = router;
