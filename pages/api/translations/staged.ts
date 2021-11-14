import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { ensureAuth } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await ensureAuth(req, res);

    const all = await db.translation.findMany();

    res.json(all);
}