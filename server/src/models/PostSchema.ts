import { Schema, model } from "mongoose";
import { User } from "./userSchema";
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const Post: any = model("posts", postSchema);
export { Post };
