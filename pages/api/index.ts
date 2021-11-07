import { RootRoute } from "../../api/routes";

export default (req, res) => new RootRoute().handler(req, res);