import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: String,
  content: {
    type: String,
    required: true,
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  time: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",    },
  ],
});

const Post = model("posts", postSchema);
export { Post };
