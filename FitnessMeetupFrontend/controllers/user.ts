import {Router, Request, Response} from 'express';
import secured from './middleware/secured';

const router = Router();

router.get('/', secured, (req: Request, res: Response) => {
    res.send(req.user);
});

export const UserController = router;
