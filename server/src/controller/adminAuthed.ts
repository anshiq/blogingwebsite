import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Post } from "../models/PostSchema";
async function createPost(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { title, description, content } = req.body;
    const user = await User.findById(userId);
    const uploadedFile = req.file;
    console.log(uploadedFile?.filename);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.ispublisher != true) {
      return res.status(404).json({ error: "User is not publisher" });
    }

    const data = await Post.create({
      title,
      description,
      content,
      thumbnail: uploadedFile?.filename,
      writer: user._id,
      likes: [],
    });

    return res.status(201).json({ message: "Post created successfully", data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error", err });
  }
}

async function deletePost(req: Request, res: Response) {
  const userId = req.userId;
  const postId = req.body.id;

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
async function getAdminPosts(req: Request, res: Response) {
  const adminId = req.userId;
  const user = await User.findById(adminId);
  if (user?.ispublisher) {
    const post = await Post.find({ writer: adminId });
    res.send(post);
    return;
  }
  res.send({ err: true });
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
export { createPost, editPost, deletePost, getAdminPosts };
