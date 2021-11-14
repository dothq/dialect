import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { ensureAuth, getUser } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await ensureAuth(req, res);

    const user = await getUser(req);
    if(!user) return res.status(403).json({ ok: false });

    const { slug } = req.query;

    const match = await db.organisation.findFirst({
        where: {
            slug: slug.toString()
        }
    });

    if(match) {
        res.json(match);
    } else {
        res.status(404).json({ ok: false });
    }
}