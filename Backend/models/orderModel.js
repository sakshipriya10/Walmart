import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  status: { type: String, default: "Placed" },
  createdAt: { type: Date, default: Date.now },

});

const Order = mongoose.model("Order", orderSchema);
export default Order;
