import { Router } from "express";
import {
  addToReadLater,
  commentOnPost,
  displayname,
  fetchposts,
} from "../controller/userAuthed";
const authUserRouter = Router();
authUserRouter.route("/displayposts").get(fetchposts);
authUserRouter.route("/commentPost").get(commentOnPost);
authUserRouter.route("/addToReadLater").post(addToReadLater);
authUserRouter.route("/api").get(displayname);
authUserRouter.route("/commentPost").post(commentOnPost);
export { authUserRouter };
