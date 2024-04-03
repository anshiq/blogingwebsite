import { Schema, model } from "mongoose";
const userSchema = new Schema({
  itemId: String,
  ownerId: String,
  buyerId: String,
  addressToSell: String,
  reached: Boolean,
});
const Orders = model("Orders", userSchema);
export { Orders };
