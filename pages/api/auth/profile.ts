import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = nookies.get({ req });

    nookies.destroy({ res }, "sign_in_redir", { path: "/" });

    if(cookies && cookies.session) {
        axios.get(
            "https://api.github.com/user", {
                headers: { authorization: `token ${cookies.session}` }
            }
        ).then(r => {
            res.json(r.data);
        }).catch(e => res.status(403).json({ ok: false }))
    } else {
        res.status(403).json({ ok: false })
    }
}