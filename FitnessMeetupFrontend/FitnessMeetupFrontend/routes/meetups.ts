import csurf = require("csurf");

import { Router, Request, Response } from "express";
import { ApiFactory } from "../src/api/ApiFactory";
import { Meetup } from "../src/api/api";
import { DomainValidator } from "./../src/handlebarsHelpers";
import ensureProfile from "./middleware/ensureProfile";

const router: Router = Router();
const csrf = csurf();

router.get("/new", ensureProfile, csrf, async (req: Request, res: Response) => {
    res.locals.title = "New meetup";
    res.locals.sports = (await ApiFactory.createSportsApi().getAllSports()).body;
    res.locals.csrf = req.csrfToken();
    res.render("newMeetup", res.locals);
});

router.post("/new", ensureProfile, csrf, async (req: Request, res: Response) => {
    let meetup: Meetup = {
        title: req.body.title,
        description: req.body.description,
        sport: req.body.sport,
        date: new Date(req.body.date),
        owner: req.user.profile,
        location: { lat: 1, lng: 1 }
    };

    try {
        let result: Meetup = (await ApiFactory.createMeetupsApi(req.user.accessToken).addMeetup(meetup)).body;

        if (!DomainValidator.isNumber(result.id + "")) {
            throw new Error("Invalid response from API");
        }
        res.redirect("/meetups/" + result.id);
    } catch (err) {
        console.log(err);
        res.redirect("/new");
    }
});

router.post("/:id/join", ensureProfile, csrf, async (req: Request, res: Response) => {
    try {
        if (!DomainValidator.isNumber(req.params.id)) {
            throw new Error("Invalid meetup id");
        }
        let result: Meetup = (await ApiFactory.createMeetupsApi(req.user.accessToken).addParticipant(req.params.id, res.locals.profile.id)).body;

        if (!DomainValidator.isNumber(result.id + "")) {
            throw new Error("Invalid response from API");
        }
        res.redirect("/meetups/" + result.id);
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

router.get("/:id", csrf, async (req: Request, res: Response) => {
    try {
        if (!DomainValidator.isNumber(req.params.id + "")) {
            throw new Error("Invalid meetup id");
        }

        res.locals.meetup = (await ApiFactory.createMeetupsApi().getMeetup(req.params.id)).body;
        res.locals.title = res.locals.meetup.title;
        res.locals.csrf = req.csrfToken();

        if (res.locals.profile) {
            if (res.locals.meetup.participants.find(value => value.id === res.locals.profile.id)) {
                res.locals.participates = true;
            }
        }

        res.render("meetupDetails", res.locals);
    } catch (err) {
        console.log(err);
        res.redirect("/meetups");
    }
});

router.get("/", (async (req: Request, res: Response) => {
    let sport: string = req.query.sport;
    if (sport && !DomainValidator.isText(sport)) {
        sport = undefined;
    }

    res.locals.meetups = (await ApiFactory.createMeetupsApi().getUpcomingMeetups(0, 20, sport)).body;
    res.locals.sports = (await ApiFactory.createSportsApi().getAllSports()).body;
    res.locals.title = "Upcoming meetups";
    res.render("meetups", res.locals);
}));

export default router;
