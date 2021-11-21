import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { db } from "../db";

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

export const getUserSelf = async({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
    return getUser({ req, res });
}

export const getUserAnonymously = async (id: string) => {
    const match = await db.user.findFirst({
        where: {
            id
        }
    });

    return match;
}

export const getUser = async ({ id, req, res }: { id?: string, req: NextApiRequest, res?: NextApiResponse }): Promise<any> => {
    return new Promise(async (resolve) => {
        const error = () => {
            if(res) res.status(403).json({ ok: false });
            resolve(false);
        }

        const cookies = nookies.get({ req });

        if(cookies && cookies.session) {
            let data: any = null;

            try {
                data = jwt.verify(cookies.session, `${process.env.AUTH_TOKEN}`);

                if(data && data.id) {
                    const match = await db.user.findFirst({
                        where: {
                            id: id ? id : data.id
                        }
                    });

                    if(match) {
                        resolve(match);
                    } else {
                        error();
                    }
                } else {
                    error();
                }
            } catch(e) {
                error();
            }
        } else {
            resolve(null);
        }

        resolve(true);
    })
}