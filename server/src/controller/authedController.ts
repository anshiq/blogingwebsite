import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { exeCpp } from "../compiler/cpp_compiler";
import { Orders } from "../models/ordersSchema";
import { Items } from "../models/itemsSchema";
const getUserDetails = async (req: Request, res: Response) => {
  try {
    const data = await User.findById(req.userId);
    if (!data) return;
    const user = {
      success: true,
      data: {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        type: data.seller,
        cart: data.cart.length,
      },
    };
    res.json(user);
  } catch (error) {
    res.json({ success: false, data: { msg: JSON.stringify({ err: error }) } });
  }
};
const CartDetails = async (req: Request, res: Response) => {
  const user = req.userId;
  const data = await Orders.findById(user);
  if (data) {
    res.send(data);
  }
};

const postItem = async (req: Request, res: Response) => {
  const user = req.userId;
  const isSeller = await User.findById(user);
  if (!isSeller) return res.send({ err: true });
  const { name, Price, Owner, description, NoOfStocks } = req.body;
  const data = await Items.create({
    name,
    Price,
    Owner: req.userId,
    description,
    NoOfStocks,
    NoOfSold: 0,
  });
  if (data) {
    res.send(data);
  }
};
const getUserItems = async (req: Request, res: Response) => {
  const user = req.userId;
  const data = await Items.find({ Owner: user });
  res.send(data);
  return;
};
const deleteItem = async (req: Request, res: Response) => {
  const id = req.headers._id;
  console.log(id);
  const data = await Items.findOneAndDelete({ _id: id, Owner: req.userId });
  if (data) {
    res.send({ success: true, data: { msg: "Successfully deleted" } });
  } else {
    res.send({ success: false, data: { msg: "failed" } });
  }
};
const editItem = async (req: Request, res: Response) => {
  const user = req.userId;
  console.log(user);
  const isSeller = await User.findById(user);
  if (!isSeller) return res.send({ err: true });
  const { name, Price, description, NoOfStocks, _id, brand, discount } =
    req.body;
  console.log(req.body);
  const data = await Items.findOneAndUpdate(
    { Owner: user, _id: _id },
    {
      name,
      Price,
      discount,
      description,
      NoOfStocks,
      brand,
    },
  );
  if (data) {
    res.send({ success: true, data: { msg: "Successfully Updated" } });
  } else {
    res.send({ success: false, data: { msg: "failed" } });
  }
};
const addToCart = async (req: Request, res: Response) => {
  const data = await User.findById(req.userId);
  const { id } = req.body;
  data?.cart.push(id);
  data?.save();
  res.send(data);
};
export {
  getUserDetails,
  CartDetails,
  postItem,
  getUserItems,
  deleteItem,
  editItem,
  addToCart,
};
