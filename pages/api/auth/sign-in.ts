import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const isDev = process.env.NODE_ENV == "development";

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