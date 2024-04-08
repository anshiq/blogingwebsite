import { Router } from "express";
const authAdminRouter = Router();
authAdminRouter.route("/createPost").get((req, res) => res.end("Hi"));
authAdminRouter.route("/editPost").post((req, res) => res.end("Hi"));
authAdminRouter.route("/deletePost").post((req, res) => res.end("Hi"));
export { authAdminRouter };
