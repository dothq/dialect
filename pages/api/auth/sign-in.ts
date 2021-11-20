import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const isDev = process.env.NODE_ENV == "development";

    if(req.query.to) {
        nookies.set({ res }, "sign_in_redir", req.query.to.toString(), { path: "/" });
    }

    const url = (id: any, redirect: any) => 
    `https://github.com/login/oauth/authorize?client_id=${id}&redirect_uri=${redirect}&scope=read:org read:user`

    if(isDev) {
        res.redirect(url(
            process.env.GITHUB_DEV_APP_CLIENT_ID,
            process.env.GITHUB_DEV_APP_REDIRECT_URI
        ))
    } else {
        res.redirect(url(
            process.env.GITHUB_PROD_APP_CLIENT_ID,
            process.env.GITHUB_PROD_APP_REDIRECT_URI
        ))
    }
}