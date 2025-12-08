import express from "express";

const router = express.Router();

import {
  createOrder,
  getOrder,
  deleteOrder,
} from "../controllers/orderController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrder);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
