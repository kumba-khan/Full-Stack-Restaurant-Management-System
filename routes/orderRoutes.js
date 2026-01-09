import express from "express";
import Order from "../models/Order.js";

import {
  createOrder,
  listOrders,
  showEdit,
  updateOrder,
  deleteOrder,
  showCreateOrder,
} from "../controllers/orderController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/create", authMiddleware, showCreateOrder);

router.post("/create", authMiddleware, createOrder);

router.get("/", authMiddleware, roleMiddleware(["admin"]), listOrders);
// Regular user can only see their own orders
router.get("/my", authMiddleware, roleMiddleware(["user"]), listOrders);

router.get("/edit/:id", showEdit);
router.post("/edit/:id", updateOrder);

// Users can only delete their own orders
router.delete(
  "/delete/:id",
  authMiddleware,
  async (req, res, next) => {
    if (req.user.role === "user") {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      // Check if order exists
      if (!order) {
        return res
          .status(404)
          .render("error", { title: "Sorry", message: "Order not found" });
      }

      // Check if user owns the order
      if (!order.user || order.user.toString() !== req.user._id.toString()) {
        return res.status(403).render("error", {
          title: "Sorry",
          message: "Cannot delete others' orders",
        });
      }
    }
    next();
  },
  deleteOrder
);

export default router;
