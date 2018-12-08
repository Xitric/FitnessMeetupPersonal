import {Router, Request, Response} from 'express';
import ensureProfile from './middleware/ensureProfile';

const router = Router();

router.get('/', ensureProfile, (req: Request, res: Response) => {
    res.locals.title = res.locals.profile.name;
    res.render('profile', res.locals);
});

export const UserController = router;
