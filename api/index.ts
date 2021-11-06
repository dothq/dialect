import { NextApiRequest, NextApiResponse } from "next";
import { RootRoute } from "./routes";
import { GitHubAuthRoute } from "./routes/auth/github";
import { GoogleAuthRoute } from "./routes/auth/google";
import { TwitterAuthRoute } from "./routes/auth/twitter";

export default {
    "GET /": RootRoute,

    "GET /auth/github": GitHubAuthRoute,
    "GET /auth/twitter": TwitterAuthRoute,
    "GET /auth/google": GoogleAuthRoute
}

export type Req = NextApiRequest;
export type Res = NextApiResponse;