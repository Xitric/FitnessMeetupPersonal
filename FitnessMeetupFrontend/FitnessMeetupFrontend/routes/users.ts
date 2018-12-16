import { Router, Request, Response } from "express";
import ensureProfile from "./middleware/ensureProfile";
import { ApiFactory } from "../src/api/ApiFactory";

const router: Router = Router();

router.get("/me", ensureProfile, (_req: Request, res: Response) => {
    res.redirect("/users/" + res.locals.profile.id);
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        res.locals.user = (await ApiFactory.createUsersApi().getUser(req.params.id)).body;
        res.locals.title = res.locals.user.name;
        res.render("profile", res.locals);
    } catch (err) {
        res.redirect("/");
    }
});

export default router;