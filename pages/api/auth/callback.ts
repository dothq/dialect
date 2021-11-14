import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const isDev = process.env.NODE_ENV == "development";

    const client_id = isDev
        ? process.env.GITHUB_DEV_APP_CLIENT_ID
        : process.env.GITHUB_PROD_APP_CLIENT_ID;

    const client_secret = isDev
        ? process.env.GITHUB_DEV_APP_CLIENT_SECRET
        : process.env.GITHUB_PROD_APP_CLIENT_SECRET;

    const redirect_uri = isDev
        ? process.env.GITHUB_DEV_APP_REDIRECT_URI
        : process.env.GITHUB_PROD_APP_REDIRECT_URI;

    axios.post(
        "https://github.com/login/oauth/access_token",
        { 
            client_id,
            client_secret,
            redirect_uri,
            code: req.query.code 
        },
        {
            headers: {
                accept: "application/json"
            }
        }
    ).then(r => {
        if(r.data && r.data.error) return res.end(r.data.error_description ? r.data.error_description : r.data.error);
        else {
            nookies.set({ res }, "session", r.data.access_token, { path: "/" });

            res.redirect("/");
        }
    })
}