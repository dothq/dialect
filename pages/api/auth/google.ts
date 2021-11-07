import { GoogleAuthRoute } from "../../../api/routes/auth/google";

export default (req, res) => new GoogleAuthRoute().handler(req, res);