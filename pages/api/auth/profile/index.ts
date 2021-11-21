import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../db";
import { getUserSelf } from "../../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getUserSelf({ req, res });
    
    switch(req.method) {
        case "PUT":
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    ...user,
                    ...req.body
                }
            });

            res.json({
                ...user,
                ...req.body
            });
        case "GET":
        default:
            if(user) {
                res.json(user);
            } else {
                res.status(404).json({ ok: false });
            }
            
            break;
    }
}