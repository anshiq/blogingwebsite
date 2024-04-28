import { Router } from "express";
import {
  addToReadLater,
  // commentOnPost,
  displayname,
  likePost,
  readLaterPost,
} from "../controller/userAuthed";
const authUserRouter = Router();
// authUserRouter.route("/commentPost").get(commentOnPost);
authUserRouter.route("/addToReadLater").post(addToReadLater);
authUserRouter.route("/read-later-post").get(readLaterPost);
authUserRouter.route("/displayname").get(displayname);
authUserRouter.route("/like-post").post(likePost);
export { authUserRouter };
