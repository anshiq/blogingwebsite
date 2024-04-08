import { Router } from "express";
const authUserRouter = Router();
authUserRouter.route("/addToWishlist").get((req, res) => res.send("hi"));
authUserRouter.route("/likePost").post((req, res) => res.end("Hi"));
authUserRouter.route("/commentPost").post((req, res) => {
  res.send("hi");
});
export { authUserRouter };
