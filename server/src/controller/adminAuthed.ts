import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Post } from "../models/PostSchema";
async function createPost(req: Request, res: Response) {
  res.send("hi");
}
async function editPost(req: Request, res: Response) {
  res.send("Hi");
}
async function deletePost(req: Request, res: Response) {
  res.send("Hi");
}

export { createPost, editPost, deletePost };
