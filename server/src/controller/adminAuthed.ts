import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Post } from "../models/PostSchema";
async function createPost(req: Request, res: Response) {
  const userId = req.userId;
  const { title, description, content } = req.body;
  const user = await User.findById(userId);

  console.log(userId, user, req.body);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.ispublisher != true) {
    return res.status(404).json({ error: "User is not publisher" });
  }

  try {
    const data = await Post.create({
      title,
      description,
      content,
      writer: user._id,
      likes: 0,
      dislikes: 0,
      comments: [],
    });

    return res.status(201).json({ message: "Post created successfully", data });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function editPost(req: Request, res: Response) {
  const userId = req.userId;
  const postId = req.body.postId;
  const { title, description, content } = req.body;

  try {
    const data = await Post.findOneAndUpdate(
      { _id: postId, writer: userId },
      {
        title,
        description,
        content,
      },
      { new: true },
    );

    if (!data) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    return res.status(200).json({ message: "Post updated successfully", data });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePost(req: Request, res: Response) {
  const userId = req.userId;
  const postId = req.body.postId;

  try {
    const data = await Post.findOneAndDelete({ _id: postId, writer: userId });

    if (!data) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { createPost, editPost, deletePost };
