import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../db";
import { ensureAuth } from "../../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await ensureAuth(req, res);

    const translation = await db.translation.create({
        data: {
            id: req.body.id
        }
    })

    res.json(translation);
}