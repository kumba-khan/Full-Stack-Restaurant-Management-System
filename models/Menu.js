import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  items: [foodItemSchema], // ARRAY OF FOOD ITEMS
});

export default mongoose.model("Menu", menuSchema);
