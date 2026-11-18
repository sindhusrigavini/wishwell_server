// models/Wish.js
import mongoose from "mongoose";

const wishSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  link: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  mostWanted: { type: Boolean, default: false },
  image: String, // base64 or URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Wish", wishSchema, "wishwell_collection");