import { Req, Res } from "..";
import { Route } from "../route";

export class RootRoute extends Route {
    public handler(req: Req, res: Res) {
        res.json({
            ok: true,
            app: {
                version: require("../../package.json").version
            }
        })
    }
}