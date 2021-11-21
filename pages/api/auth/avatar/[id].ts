import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserAnonymously } from "../../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id.toString();
    const user = await getUserAnonymously(id);
    
    if(user && user.avatar_url && user.avatar_url.length) {
        const { data } = await axios.get(user.avatar_url, { responseType: "arraybuffer" });

        res.end(data);
    } else {
        // todo add fallback
        res.end("");
    }
}