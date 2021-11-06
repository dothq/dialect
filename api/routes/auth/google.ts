import { Req, Res } from "../..";
import { Route } from "../../route";

export class GoogleAuthRoute extends Route {
    public handler(req: Req, res: Res) {
        res.redirect("https://google.com")
    }
}