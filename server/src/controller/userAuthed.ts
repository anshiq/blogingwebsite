import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Post } from "../models/PostSchema";
async function addToReadLater(req: Request, res: Response) {
  const postId = req.body.postId;
  const userId = req.userId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.readLater.push(post._id);
    await user.save();
    res.status(200).json({ message: "Post added to read later list" });
  } catch (error) {
    console.error("Error adding post to read later:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function commentOnPost(req: Request, res: Response) {
  const postId = req.body.postId;
  const userId = req.userId;
  const comment = req.body.comment;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    post.comments.push({
      userId: userId,
      text: comment,
    });
    await post.save();
    res.status(200).json({ message: "success fully commented on post" });
  } catch (error) {
    console.error("Error adding post to read later:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const displayname = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ data: { name: user.name }, success: true });
};
export { addToReadLater, commentOnPost, displayname };
