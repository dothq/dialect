import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default (req: NextApiRequest, res: NextApiResponse) => {
    nookies.destroy({ res }, "session", { path: "/" });
    nookies.destroy({ res }, "sign_in_redir", { path: "/" });

    res.redirect("/");
}