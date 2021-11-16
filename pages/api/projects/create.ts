import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { ensureAuth } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "POST") {
        await ensureAuth(req, res);

        await db.project.create({ data: req.body });

        res.json({ ok: true });
    } else {
        res.status(404);
    }
}