import { Req, Res } from "../..";
import { Route } from "../../route";

export class TwitterAuthRoute extends Route {
    public handler(req: Req, res: Res) {
        res.redirect("https://twitter.com")
    }
}