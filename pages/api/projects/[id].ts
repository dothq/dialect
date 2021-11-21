import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { getUserSelf } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getUserSelf({ req, res });
    const id = parseInt(req.query.id.toString());

    if(isNaN(id)) return res.status(404).json({ ok: false });

    let project = await db.project.findFirst({
        where: { id: parseInt(req.query.id.toString()) }
    });

    if(!project) return res.status(404).json({ ok: false });

    switch(req.method) {
        case "PUT":
            if(project.author_id !== user.id) return res.status(403).json({ ok: false });
            if(req.body.slug && !req.body.slug.length) return res.status(400).json({ ok: false });

            delete req.body.author;

            project = await db.project.update({
                where: {
                    id: project.id
                },
                data: {
                    ...req.body,
                    date_updated: new Date().toISOString()
                }
            });

            res.json(project);
            break;
        case "DELETE":
            await db.project.delete({
                where: {
                    id: project.id
                }
            })

            res.json({ ok: true });
            break;
        case "GET":
        default:
            res.json(project);
            break;
    }
}