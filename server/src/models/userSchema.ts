import { Schema, model } from "mongoose";
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
  ispublisher: {
    type: Boolean,
  },
  readLater: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
const User = model("users", userSchema);
export { User };
