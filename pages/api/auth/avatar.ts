import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = nookies.get({ req });

    if(cookies && cookies.session) {
        axios.get(
            "https://api.github.com/user", {
                headers: { authorization: `token ${cookies.session}` }
            }
        ).then(r => {
            const username = r.data.login;

            axios.get(`https://github.com/${username}.png`, { responseType: "arraybuffer" })
                .then(av => {
                    for(const [key, value] of Object.entries(av.headers)) {
                        res.setHeader(key, value);
                    }

                    res.end(av.data);
                })
        })
    } else {
        
    }
}