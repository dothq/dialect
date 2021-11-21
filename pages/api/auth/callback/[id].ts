import axios from "axios";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { db } from "../../../../db";
import { getEnvStr } from "../../../../util/env";

const getUserByProviderUserId = async (id: string, user_id: string) => {
    user_id = user_id.toString();

    return await db.user.findFirst({
        where: {
            [`${id}_id`]: user_id
        }
    })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const provider = req.query.id.toString();

    const client_id = getEnvStr(provider, "client_id");
    const client_secret = getEnvStr(provider, "client_secret");
    const redirect_uri = getEnvStr(provider, "redirect_uri");

    const body = { 
        client_id,
        client_secret,
        redirect_uri,
        code: req.query.code 
    };

    let access_token = "";

    try {
        const res = await axios.post(
            "https://github.com/login/oauth/access_token",
            body,
            { headers: { accept: "application/json"} }
        );

        access_token = res.data.access_token;
    } catch(e) {
        return res.end("Failed to grab access_token. Please report this to your system administrator.");
    }

    const headers = {
        authorization: `token ${access_token}`
    }

    let profile: any;

    try {
        const res = await axios.get("https://api.github.com/user", { headers });

        profile = res.data;
    } catch(e) {
        return res.end("Token has expired.")
    }

    let match = await getUserByProviderUserId(provider, profile.id);

    const cookies = nookies.get({ req });

    const finalUrl = cookies.sign_in_redir 
        ? cookies.sign_in_redir 
        : "/";

    if(!match) {
        const payload: any = {
            name: profile.name,
            avatar_url: profile.avatar_url,
        };

        switch(provider) {
            case "github":
                payload.github_id = profile.id.toString();
                break;
        }

        await db.user.create({
            data: payload
        });
    }

    match = await getUserByProviderUserId(provider, profile.id);

    if(match) {
        const token = jwt.sign({ id: match.id }, `${process.env.AUTH_TOKEN}`);
        const date = new Date();
        date.setHours(date.getHours() + 3);

        nookies.set({ res }, "session", token, { path: "/", expires: date });

        res.redirect(finalUrl);
    } else {
        res.end("Failed to create user profile.");
    }
}