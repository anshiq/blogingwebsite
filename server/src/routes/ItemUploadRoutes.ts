import express from "express";
import { upload } from "../Others/multer";
import { Items } from "../models/itemsSchema";
const itemUploadHandlerRouter = express.Router();

itemUploadHandlerRouter.post(
  "/upload",
  upload.fields([{ name: "thumbnail" }, { name: "images" }]),
  async (req: any, res: any) => {
    try {
      const { name, Price, description, NoOfStocks, brand, discount } =
        req.body;
      if (!req.files || !req.files["thumbnail"] || !req.files["images"]) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      const thumbnail = req.files["thumbnail"][0].path;
      const images = req.files["images"].map((file: any) => file.path);
      // console.log(images, thumbnail, name, description, NoOfStocks, brand);
      const data = await Items.create({
        images,
        name,
        description,
        NoOfStocks,
        brand,
        Price,
        thumbnail,
        Owner: req.userId,
        discount,
        stars: 4,
        solds: 0,
      });
      res.status(201).json({ message: "Item created successfully", data });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
);

export { itemUploadHandlerRouter };
