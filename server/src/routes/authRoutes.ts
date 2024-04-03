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
const authRouter = Router();
authRouter.route("/api").get(getUserDetails);
authRouter.route("/cart").post(CartDetails);
authRouter.route("/postItem").post(postItem);
authRouter.route("/useritems").get(getUserItems);
authRouter.route("/updateitems").patch(editItem);
authRouter.route("/deleteitems").delete(deleteItem);
authRouter.route("/add-to-cart").patch(addToCart);
export { authRouter };
