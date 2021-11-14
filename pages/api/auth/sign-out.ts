import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default (req: NextApiRequest, res: NextApiResponse) => {
    nookies.destroy({ res }, "session", { path: "/" });
    res.redirect("/");
}