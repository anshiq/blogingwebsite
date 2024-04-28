import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect_db } from "./db/connect";
import { verifyToken } from "./middlewares/authMiddleware";
import { userRouter } from "./routes/userRoutees";
import { authUserRouter } from "./routes/authUserRoutes";
import { authAdminRouter } from "./routes/authAdminRoutes";
import path from "path";
dotenv.config();
const port: string | number = process.env.PORT || 8080;
const uri: string = process.env.MONGOURI || "";
const app: Express = express();
app.use(express.json({ limit: "20mb" }));
app.use(cors());
console.log(__dirname);
app.use("/static", express.static(path.join(__dirname, "../upload")));
app.use("/user", userRouter);
app.use("/authedUser", verifyToken, authUserRouter);
app.use("/authedAdmin", verifyToken, authAdminRouter);
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
