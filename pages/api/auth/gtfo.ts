import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { getUserSelf } from "../../../util/auth";

// delete the account (gtfo)
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getUserSelf({ req, res });

    await db.user.delete({
        where: {
            id: user.id
        }
    });

    res.redirect("/api/auth/sign-out");
}