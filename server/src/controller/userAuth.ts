import { Request, Response } from "express";
import { User } from "../models/userSchema";
import {
  comparePassword,
  createJwt,
  generateVerificationToken,
  hashPassword,
  sendVerificationEmail,
} from "../Others/AuthFuntions";
import { Post } from "../models/PostSchema";

async function searchPosts(req: Request, res: Response) {
  const searchText = req.body.text;

  try {
    const regex = new RegExp(searchText, "i");
    const posts = await Post.find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    }).select("title description thumbnail");

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
async function signupUser(req: Request, res: Response) {
  try {
    const { name, email, isPublisher, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ success: false, data: { msg: "User already Exist..." } });
      return;
    }
    const hashedpassword = await hashPassword(password);
    const token = generateVerificationToken();
    const data = await User.create({
      name,
      email,
      password: hashedpassword,

      verifyToken: token,
      verified: false,
      ispublisher: isPublisher,
    });
    if (data) {
      const verificationLink = `${process.env.weburl}/user/verify-email?token=${token}`;
      const mailoptions = {
        to: data.email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: ${verificationLink}`,
      };
      sendVerificationEmail(mailoptions);
      res.json({ success: true, data: { msg: "User signup successful." } });
    }
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: "Internal Server Error" });
    console.error(error);
  }
}
async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email: email });
    if (data) {
      const isUser = await comparePassword(password, data.password);
      if (isUser) {
        if (data.verified === false) {
          res.send({
            success: true,
            data: { msg: "verify your email first" },
          });
          return;
        }
        const token = createJwt(data._id.toString());
        res.json({
          success: true,
          data: { token: token, msg: "Login Successfully !!!" },
        });
      } else {
        res.json({ success: false, data: { msg: "Wrong Credentials" } });
      }
    } else {
      res.json({ success: false, data: { msg: "Wrong Credentials" } });
    }
  } catch (error) {
    res.json({
      success: false,
      data: { msg: JSON.stringify({ error: error }) },
    });
    console.log(error);
  }
}
const verifyEmailToken = async (req: Request, res: Response) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ msg: "Verification token is missing." });
  }
  try {
    const user = await User.findOne({ verifyToken: token });
    if (!user) {
      return res.status(200).json({
        success: true,
        data: { msg: "User not found or already verified." },
      });
    }
    user.verified = true;
    user.verifyToken = undefined;
    await user.save(); // Save the updated user record
    // console.log(user);
    res.status(200).json({
      success: true,
      data: { msg: "User  verification successfully." },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "An error occurred during email verification." });
  }
};
async function verifyForgotPasswordToken(req: Request, res: Response) {
  try {
    const { token, password } = req.body;
    // console.log(req.body);
    const hashedpassword = await hashPassword(password);
    const data = await User.findOne({ verifyToken: token });
    if (data) {
      // console.log(data.password);
      // console.log(hashedpassword);
      data.verifyToken = undefined;
      data.verified = true;
      data.password = hashedpassword;
      data.save();
      res.json({
        success: true,
        data: { msg: "password updated successfully" },
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
}
async function forgotPassword(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      const token = generateVerificationToken();
      user.verifyToken = token;
      // console.log(token);
      user.save();
      const verificationLink = `http://localhost:3000/user/reset-password?token=${token}`;
      const mailoptions = {
        to: user.email,
        subject: "Reset password",
        text: `Please click the following link to Reset Password: ${verificationLink}`,
      };
      sendVerificationEmail(mailoptions);
      res.json({
        success: true,
        data: {
          msg: "Please Check your mail for reset password.",
        },
      });
    }
  } catch (error) {
    res.json({
      success: false,
      data: { msg: JSON.stringify({ error: error }) },
    });
    console.log(error);
  }
}
async function fetchposts(req: Request, res: Response) {
  try {
    const posts = await Post.find().select("title description thumbnail");
    if (!posts) {
      return res.status(400).json({ message: "Unable to fetch posts" });
    }
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getOnepost(req: Request, res: Response) {
  try {
    const postId = req.body.postId;
    const posts = await Post.findById(postId);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(400).json({ message: "Unable to fetch posts" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
export {
  signupUser,
  forgotPassword,
  loginUser,
  verifyEmailToken,
  verifyForgotPasswordToken,
  fetchposts,
  searchPosts,
  getOnepost,
};
