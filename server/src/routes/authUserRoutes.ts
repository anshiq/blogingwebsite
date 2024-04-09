import { Router } from "express";
import { addToReadLater, commentOnPost } from "../controller/userAuthed";
const authUserRouter = Router();
authUserRouter.route("/addToReadLater").post(addToReadLater);
authUserRouter.route("/commentPost").post(commentOnPost);
export { authUserRouter };
