import { Schema, model } from "mongoose";
import { Post } from "./PostSchema";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
  },
  verifyToken: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  ispublisher: {
    type: Boolean,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
const User: any = model("users", userSchema);
export { User };
