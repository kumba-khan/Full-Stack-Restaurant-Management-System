import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect dashboard route
router.get("/", authMiddleware, (req, res) => {
  res.render("dashboard/index", { user: req.user });
});

export default router;
