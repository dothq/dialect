import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { ensureAuth, getUser } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "PUT") {
        await ensureAuth(req, res);

        const user = await getUser(req);
        if(!user) return res.status(403).json({ ok: false });

        const project = await db.project.findFirst({
            where: { slug: req.query.id.toString() }
        });

        if(!project) return res.status(404).json({ ok: false });

        if(project.author_id !== user.id) return res.status(403).json({ ok: false });

        await db.project.update({
            where: {
                id: project.id
            },
            data: req.body
        });

        res.json({ ok: true });
    } else {
        res.status(404);
    }
}