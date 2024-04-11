import { Router } from "express";
import { createPost, deletePost, editPost } from "../controller/adminAuthed";
const authAdminRouter = Router();
authAdminRouter.route("/createPost").post(createPost);
authAdminRouter.route("/editPost").post(editPost);
authAdminRouter.route("/deletePost").post(deletePost);
export { authAdminRouter };
