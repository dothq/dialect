import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id.toString();
    const user = await getUser({ id, req, res });
    
    if(user) {
        res.json(user);
    } else {
        res.status(404).json({ ok: false });
    }
}