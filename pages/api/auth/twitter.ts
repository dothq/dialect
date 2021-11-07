import { TwitterAuthRoute } from "../../../api/routes/auth/twitter";

export default (req, res) => new TwitterAuthRoute().handler(req, res);