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
        `https://google.com/search?q=${q}`,
        { headers }
    );

    const $ = cheerio.load(r.data);

    const from = $(`select[name="tlitesl"]`).val();
    const to = $(`select[name="tlitetl"]`).val();

    const text = $(`input[name="tlitetxt"]`).val();
    let translated = $(`#lrtl-translation-text`).text();

    if(!translated || !translated.length) translated = req.query.q.toString();

    res.json({
        from,
        to,
        text,
        translated
    });
}