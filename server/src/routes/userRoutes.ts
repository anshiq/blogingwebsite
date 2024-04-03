import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  signupUser,
  verifyEmailToken,
  verifyForgotPasswordToken,
} from "../controller/userAuth";
import { Items } from "../models/itemsSchema";

const userRouter = Router();
userRouter.route("/signup").post(signupUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/verify-user").post(verifyEmailToken);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/verify-forgot-token").post(verifyForgotPasswordToken);
userRouter.route("/get-items/:id").get(async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await Items.findById(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("erro");
  }
});
userRouter.route("/get-all-items").get(async (req: any, res: any) => {
  const data = await Items.find();
  console.log(data);
  // const k = [
  //   {
  //     _id: "65e9d0875e85bed18d45e0ee",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Nike Red Blue Shoes",
  //     Price: "444",
  //     description: "Nike shoes of size this and this",
  //     NoOfStocks: 55,
  //     brand: "Nike",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0ef",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Adidas Black Shoes",
  //     Price: "399",
  //     description: "Adidas shoes of size this and this",
  //     NoOfStocks: 45,
  //     brand: "Adidas",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f0",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Puma White Sneakers",
  //     Price: "299",
  //     description: "Puma shoes of size this and this",
  //     NoOfStocks: 35,
  //     brand: "Puma",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f1",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Reebok Classic Shoes",
  //     Price: "269",
  //     description: "Reebok shoes of size this and this",
  //     NoOfStocks: 40,
  //     brand: "Reebok",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f2",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "New Balance Running Shoes",
  //     Price: "349",
  //     description: "New Balance shoes of size this and this",
  //     NoOfStocks: 30,
  //     brand: "New Balance",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f3",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Under Armour Basketball Shoes",
  //     Price: "389",
  //     description: "Under Armour shoes of size this and this",
  //     NoOfStocks: 25,
  //     brand: "Under Armour",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f4",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Converse High Tops",
  //     Price: "199",
  //     description: "Converse shoes of size this and this",
  //     NoOfStocks: 60,
  //     brand: "Converse",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f5",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Vans Skate Shoes",
  //     Price: "159",
  //     description: "Vans shoes of size this and this",
  //     NoOfStocks: 50,
  //     brand: "Vans",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f6",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Sketchers Running Shoes",
  //     Price: "179",
  //     description: "Sketchers shoes of size this and this",
  //     NoOfStocks: 70,
  //     brand: "Sketchers",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f7",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Saucony Running Shoes",
  //     Price: "289",
  //     description: "Saucony shoes of size this and this",
  //     NoOfStocks: 40,
  //     brand: "Saucony",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f8",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Asics Gel Shoes",
  //     Price: "329",
  //     description: "Asics shoes of size this and this",
  //     NoOfStocks: 20,
  //     brand: "Asics",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0f9",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Fila Chunky Sneakers",
  //     Price: "279",
  //     description: "Fila shoes of size this and this",
  //     NoOfStocks: 30,
  //     brand: "Fila",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0fa",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Brooks Running Shoes",
  //     Price: "359",
  //     description: "Brooks shoes of size this and this",
  //     NoOfStocks: 25,
  //     brand: "Brooks",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0fb",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Mizuno Wave Rider Shoes",
  //     Price: "279",
  //     description: "Mizuno shoes of size this and this",
  //     NoOfStocks: 15,
  //     brand: "Mizuno",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0fc",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Merrell Hiking Shoes",
  //     Price: "329",
  //     description: "Merrell shoes of size this and this",
  //     NoOfStocks: 20,
  //     brand: "Merrell",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0fd",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Salomon Trail Shoes",
  //     Price: "379",
  //     description: "Salomon shoes of size this and this",
  //     NoOfStocks: 15,
  //     brand: "Salomon",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0fe",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Timberland Boots",
  //     Price: "459",
  //     description: "Timberland shoes of size this and this",
  //     NoOfStocks: 10,
  //     brand: "Timberland",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e0ff",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Merrell Trail Gloves",
  //     Price: "299",
  //     description: "Merrell shoes of size this and this",
  //     NoOfStocks: 25,
  //     brand: "Merrell",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e100",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Keen Hiking Sandals",
  //     Price: "229",
  //     description: "Keen shoes of size this and this",
  //     NoOfStocks: 20,
  //     brand: "Keen",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65e9d0875e85bed18d45e101",
  //     thumbnail:
  //       "uploads/1709822087585-Screenshot from 2023-11-28 20-32-35.png",
  //     images: [
  //       "uploads/1709822087610-Screenshot from 2023-11-28 20-32-21.png",
  //       "uploads/1709822087632-Screenshot from 2023-11-28 20-32-35.png",
  //     ],
  //     name: "Hoka One One Running Shoes",
  //     Price: "349",
  //     description: "Hoka One One shoes of size this and this",
  //     NoOfStocks: 15,
  //     brand: "Hoka One One",
  //     Owner: "65dc890f4baad39c4f189e1e",
  //     __v: 0,
  //   },
  // ];

  res.send(data);
});

export { userRouter };
