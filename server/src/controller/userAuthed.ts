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
    res.status(200).json({ message: "Post added to read later list", post });
  } catch (error) {
    console.error("Error adding post to read later:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// async function commentOnPost(req: Request, res: Response) {
//   const postId = req.body.postId;
//   const userId = req.userId;
//   const comment = req.body.comment;
//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     post.comments.push({
//       userId: userId,
//       text: comment,
//     });
//     await post.save();
//     res.status(200).json({ message: "success fully commented on post" });
//   } catch (error) {
//     console.error("Error adding post to read later:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

const likePost = async (req: Request, res: Response) => {
  try {
    const postId = req.body._id;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const post = await Post.findByIdAndUpdate(postId, {
      $addToSet: { likes: user._id },
    });

    res.status(200).json({
      data: { name: user.name, isLiked: true },
      success: true,
    });
  } catch (error) {
    res.send({ err: error });
  }
};
const displayname = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    data: { name: user.name, isPublisher: user.ispublisher },
    success: true,
  });
};
const readLaterPost = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Promise.all(
      user.readLater.map(async (postId) => {
        return await Post.findById(postId);
      }),
    );
    if (posts[0] ===null){
      res.status(200).json([]);
      return
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  addToReadLater,
  // commentOnPost,
  displayname,
  likePost,
  readLaterPost,
};
