import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { ensureAuth } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "POST") {
        await ensureAuth(req, res);

        const created = await db.project.create({ data: req.body });

        res.redirect(`/`)
    } else {
        res.status(404);
    }
}