import { Router } from "express";
import {
  addToReadLater,
  // commentOnPost,
  displayname,
  likePost,
} from "../controller/userAuthed";
const authUserRouter = Router();
// authUserRouter.route("/commentPost").get(commentOnPost);
authUserRouter.route("/addToReadLater").post(addToReadLater);
authUserRouter.route("/displayname").get(displayname);
authUserRouter.route("/like-post").post(likePost);
export { authUserRouter };
