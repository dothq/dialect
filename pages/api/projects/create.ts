import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { getUser } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "POST") {
        const user = await getUser({ req, res });

        if(user) {
            const project = await db.project.create({ data: {
                ...req.body,
                author: {
                    connect: { id: user.id }
                }
            } });
    
            res.json(project);
        }
    } else {
        res.status(404);
    }
}