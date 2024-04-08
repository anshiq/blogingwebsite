import { error } from "console";
import mongoose from "mongoose";
const connect_db = async (uri: any) => {
  mongoose
    .connect(uri)
    .then(() => console.log("Database has been connected"))
    .catch((error) => console.log("Error while connecting to Db", error));
};
export { connect_db };
