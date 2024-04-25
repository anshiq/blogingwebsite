import { Router } from "express";
import multer from "multer";

import {
  createPost,
  deletePost,
  // editPost,
  getAdminPosts,
} from "../controller/adminAuthed";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for each uploaded file
  },
});

const upload = multer({ storage: storage });
const authAdminRouter = Router();
authAdminRouter.post("/createPost", upload.single("image"), createPost);
// authAdminRouter.route("/editPost").post(editPost);
authAdminRouter.route("/deletePost").post(deletePost);
authAdminRouter.route("/get-admin-posts").get(getAdminPosts);

export { authAdminRouter };
