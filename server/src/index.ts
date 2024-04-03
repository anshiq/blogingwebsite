import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { connect_db } from "./db/connect";
import { verifyToken } from "./middlewares/authMiddleware";
import { authRouter } from "./routes/authRoutes";
import { itemUploadHandlerRouter } from "./routes/ItemUploadRoutes";
import path from "path";
dotenv.config();
const port: string | number = process.env.PORT || 8080;
const uri: string = process.env.MONGOURI || "";
const app: Express = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
const kk = path.join(__dirname, "../");
console.log(kk);
app.use("/static", express.static(kk));
app.use("/auth", verifyToken, authRouter);
app.use("/authUpload", verifyToken, itemUploadHandlerRouter);
const start = () => {
  try {
    connect_db(uri);
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
