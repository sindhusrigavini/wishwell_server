// routes/wish.js
import express from "express";
import Wish from "../models/Wish.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Add a wish
router.post("/", verifyToken, async (req, res) => {
  try {
    const wish = new Wish({ ...req.body, userId: req.userId });
    await wish.save();
    res.status(201).json(wish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all wishes for user
router.get("/", verifyToken, async (req, res) => {
  try {
    const wishes = await Wish.find({ userId: req.userId });
    res.json(wishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a wish
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const wish = await Wish.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!wish) return res.status(404).json({ error: "Wish not found" });
    res.json(wish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a wish
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const wish = await Wish.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!wish) return res.status(404).json({ error: "Wish not found" });
    res.json({ message: "Wish deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;