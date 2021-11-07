import { NextApiRequest, NextApiResponse } from "next";
import routes from ".";

export const nextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const friendlyRoute = req.query.route && req.query.route.length
        ? Array.isArray(req.query.route)
            ? `/${req.query.route.join("/")}`
            : `/${req.query.route}`
        : `/`

    const key = `${req.method} ${friendlyRoute}`

    if(process.env.NODE_ENV !== "production") console.log("API Request:", key);

    if(routes[key]) {
        const route = new routes[key];

        return route.handler(req, res);
    } else {
        return res.status(404).json({
            ok: false,
            status: 404,
            message: "Not Found"
        })
    }
}