import { GitHubAuthRoute } from "../../../api/routes/auth/github";

export default (req, res) => new GitHubAuthRoute().handler(req, res);