import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export const ensureAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve) => {
        const cookies = nookies.get({ req });

        if(cookies && cookies.session) {
            resolve(true);
        } else {
            res.status(403).json({ ok: false });
        }
    })
}