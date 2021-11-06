import { Req, Res } from "../..";
import { Route } from "../../route";

export class GitHubAuthRoute extends Route {
    public handler(req: Req, res: Res) {
        res.redirect("https://github.com")
    }
}