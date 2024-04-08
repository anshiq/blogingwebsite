import { Router } from "express";
import {
  CartDetails,
  addToCart,
  deleteItem,
  editItem,
  getUserDetails,
  getUserItems,
  postItem,
} from "../controller/authedController";
const authUserRouter = Router();
authUserRouter.route("/addToWishlist").get(getUserDetails);
authUserRouter.route("/likePost").post(CartDetails);
authUserRouter.route("/commentPost").post((req, res) => {
  res.send("hi");
});
export { authUserRouter };
