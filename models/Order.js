import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],

  total: Number,
  // createdAt: { type: Date, default: Date.now},
});

export default mongoose.model("Order", orderSchema);
