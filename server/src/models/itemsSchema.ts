import { Schema, model } from "mongoose";
const userSchema = new Schema({
  thumbnail: String,
  images: [String],
  name: String,
  Price: String,
  description: String,
  NoOfStocks: Number,
  brand: String,
  Owner: String,
  stars: Number,
  discount: Number,
  solds: Number,
});
const Items = model("Items", userSchema);
export { Items };
