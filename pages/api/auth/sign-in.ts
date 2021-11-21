import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { getEnvStr } from "../../../util/env";

export const providerUrls: any = {
    github: ({ id, redirect }: any) => `https://github.com/login/oauth/authorize?client_id=${id}&redirect_uri=${redirect}&scope=read:org read:user`
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    const provider = req.query.id.toString();

    if(req.query.to) {
        nookies.set({ res }, "sign_in_redir", req.query.to.toString(), { path: "/" });
    }

    if(provider in providerUrls) {
        const url = providerUrls[provider]({
            id: getEnvStr(provider, "client_id"),
            secret: getEnvStr(provider, "client_secret"),
            redirect: getEnvStr(provider, "redirect_uri")
        })

        res.redirect(url);
    } else {
        return res.end("what")
    }
}