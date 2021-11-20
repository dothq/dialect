import axios from "axios";
import cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";
import { ensureAuth } from "../../../util/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await ensureAuth(req, res);

    const q = encodeURIComponent(`translate "${req.query.q}" in ${req.query.from} to ${req.query.to}`)

    const headers = {
        "user-agent": "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
    }

    const r = await axios.get(
        `https://translate.google.com/m?sl=${req.query.from}&tl=${req.query.to}&q=${encodeURIComponent(req.query.q.toString())}`,
        { headers }
    );

    const $ = cheerio.load(r.data);

    const text = $(`input[name="q"]`).val();
    let translated = $(`.result-container`).text();

    if(!translated || !translated.length) translated = req.query.q.toString();

    res.json({
        text,
        translated
    });
}