import axios from "axios";
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

export const getUser = (req: NextApiRequest): Promise<any> => {
    return new Promise((resolve) => {
        const cookies = nookies.get({ req });

        if(cookies && cookies.session) {
            axios.get(
                "https://api.github.com/user", {
                    headers: { authorization: `token ${cookies.session}` }
                }
            ).then(r => {
                resolve(r.data);
            }).catch(e => resolve(null))
        } else {
            resolve(null);
        }
    })
}