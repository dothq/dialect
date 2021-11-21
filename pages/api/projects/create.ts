import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { ensureAuth, getUser } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "POST") {
        await ensureAuth(req, res);

        const user = await getUser(req);
        if(!user) return res.status(403).json({ ok: false });

        await db.project.create({ data: {
            ...req.body,
            author_id: user.id
        } });

        res.json({ ok: true });
    } else {
        res.status(404);
    }
}