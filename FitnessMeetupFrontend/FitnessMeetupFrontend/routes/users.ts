import { Router, Request, Response } from "express";
import ensureProfile from "./middleware/ensureProfile";
import { ApiFactory } from "../src/api/ApiFactory";
import { DomainValidator } from "./../src/handlebarsHelpers";

const router: Router = Router();

// router for viewing your own profile page
router.get("/me", ensureProfile, (_req: Request, res: Response) => {
    // the provided user id is treated as untrusted data
    if (!DomainValidator.isUserId(res.locals.profile.id)) {
        return res.redirect("/");
    }
    res.redirect("/users/" + res.locals.profile.id);
});

// router for viewing the profile page of a specific user
router.get("/:id", async (req: Request, res: Response) => {
    try {
        if (!DomainValidator.isUserId(req.params.id)) {
            throw new Error("Invalid user id");
        }

        res.locals.user = (await ApiFactory.createUsersApi().getUser(req.params.id)).body;
        res.locals.title = res.locals.user.name;
        res.render("profile", res.locals);
    } catch (err) {
        res.redirect("/");
    }
});

export default router;