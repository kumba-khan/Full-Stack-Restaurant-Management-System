import express from "express";
import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  deleteMenuItem,
  showCreateMenu,
  showEditMenu,
  getMenuCards,
} from "../controllers/menuController.js";

import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/cards", authMiddleware, getMenuCards);

router.get("/", authMiddleware, roleMiddleware(["admin"]), getMenus);

router.get(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]),
  showCreateMenu
);

router.post("/create", authMiddleware, roleMiddleware(["admin"]), createMenu);

router.post("/edit/:id", authMiddleware, roleMiddleware(["admin"]), updateMenu);

router.get(
  "/edit/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  showEditMenu
);
router.post(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteMenu
);

router.post(
  "/item/:menuId/:itemId/delete",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteMenuItem
);

export default router;
