import { Router, Request, Response } from "express";
import { ApiFactory } from "../src/api/ApiFactory";

const router: Router = Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        res.locals.meetups = (await ApiFactory.createMeetupsApi().getUpcomingMeetups()).body;
    } catch (err) {
        console.log(err);
    }

    res.locals.title = "Fitness Meetup";
    res.render("index", res.locals);
});

export default router;