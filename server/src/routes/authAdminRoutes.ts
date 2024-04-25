import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAdminPosts,
} from "../controller/adminAuthed";
const authAdminRouter = Router();
authAdminRouter.route("/createPost").post(createPost);
// authAdminRouter.route("/editPost").post(editPost);
authAdminRouter.route("/deletePost").post(deletePost);
authAdminRouter.route("/get-admin-posts").get(getAdminPosts);

export { authAdminRouter };
