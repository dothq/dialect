import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ensureAuth } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await ensureAuth(req, res);

    if(!process.env.TRANSLATE_API_KEY) return res.status(500).json({ ok: false });

    axios.post(
        "https://translate.dothq.co/translate",
        { from: req.query.from, to: req.query.to, input: req.query.input },
        { 
            headers: {
                authorization: `Bearer ${process.env.TRANSLATE_API_KEY}`
            }
        }
    ).then(r => {
        res.json({
            translated: r.data,
            from: req.query.from,
            to: req.query.to
        })
    }).catch(e => {
        res.json({
            translated: `Failed to translate.`,
            from: req.query.from,
            to: req.query.to
        })
    })
}