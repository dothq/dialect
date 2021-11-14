import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { ensureAuth, getUser } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "POST") {
        await ensureAuth(req, res);

        const user = await getUser(req);
        if(!user) return res.status(403).json({ ok: false });

        if(!req.body.slug) return res.status(400).json({ ok: false });
        if(!req.body.name) return res.status(400).json({ ok: false });

        if(!req.body.name.length) return res.status(400).json({ ok: false });
        if(!req.body.slug.length) return res.status(400).json({ ok: false });

        req.body.slug = req.body.slug.replace(/\//g, "-");
        req.body.slug = req.body.slug.replace(/ /g, "-");

        if(req.body.slug.endsWith("--")) {
            req.body.slug = req.body.slug.replace(/--/g, "-");
        }

        if(req.body.slug.length >= 16) {
            req.body.slug = req.body.slug.substr(0, 16);
        }

        req.body.owner_id = user.id;
        req.body.linked_domain = null;

        const created = await db.organisation.create({
            data: req.body
        })

        res.json(created);
    } else {
        res.status(404);
    }
}