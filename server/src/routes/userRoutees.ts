import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  signupUser,
  verifyEmailToken,
  verifyForgotPasswordToken,
  fetchposts,
  searchPosts,
  getOnepost,
} from "../controller/userAuth";

const userRouter = Router();
userRouter.route("/signup").post(signupUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/verify-user").post(verifyEmailToken);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/verify-forgot-token").post(verifyForgotPasswordToken);
userRouter.route("/fetch-posts").get(fetchposts);
userRouter.route("/search-posts").post(searchPosts);
userRouter.route("/get-one-post").post(getOnepost);

export { userRouter };
