import { NextApiRequest, NextApiResponse } from "next";
import { ensureAuth, getUser } from "../../../../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await ensureAuth(req, res);

    const user = await getUser({ req, res });

    // const translation = await db.translation.create({
    //     data: {
    //         id: req.body.id,
    //         string: req.body.string,
    //         category_id: req.query.category.toString(),
    //         translation_comment: req.body.translation_comment,
    //         author_id: user.id,
    //         memories: req.body.memories || []
    //     }
    // })

    // res.json(translation);
}