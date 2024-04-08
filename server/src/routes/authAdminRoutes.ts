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
const authAdminRouter = Router();
authAdminRouter.route("/createPost").get(getUserDetails);
authAdminRouter.route("/editPost").post(CartDetails);
authAdminRouter.route("/deletePost").post(postItem);
export { authAdminRouter };
