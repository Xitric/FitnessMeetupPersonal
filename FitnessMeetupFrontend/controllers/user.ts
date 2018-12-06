import {Router, Request, Response} from 'express';
import secured from './middleware/secured';
import {UsersApi, User} from './../src/api';

const router = Router();

router.get('/', secured, (req: Request, res: Response) => {
    let users = new UsersApi('https://localhost:44381/v1');
    users.accessToken = req.user.accessToken;
    users.getUser('110786492158656662718').then(value => {
        console.log(value);
        res.send(req.user);
    });
});

export const UserController = router;
