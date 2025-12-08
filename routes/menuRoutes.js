import express from "express";

const router = express.Router();

import {
  createMenu,
  getMenu,
  getMenuById,
  addFoodItem,
  updateMenu,
  deleteMenu,
} from "../controllers/menuController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/", authMiddleware, createMenu);
router.get("/", authMiddleware, getMenu);
router.get("/:id", authMiddleware, getMenuById);
router.patch("/:id/add-item", authMiddleware, addFoodItem);
router.patch("/:id", authMiddleware, updateMenu);
router.delete("/:id", authMiddleware, deleteMenu);

export default router;
