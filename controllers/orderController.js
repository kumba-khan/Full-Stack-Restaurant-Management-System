import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

// Show create order form
export const showCreateOrder = async (req, res, next) => {
  try {
    const menus = await Menu.find().lean();
    res.render("orders/create", { menus });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items) {
      return res.render("orders/create", {
        error: "Items are required",
      });
    }

    const orderItems = [];

    for (const item of items) {
      if (!item.menuItemId || item.quantity <= 0) continue;

      const menu = await Menu.findOne(
        { "items._id": item.menuItemId },
        { "items.$": 1 }
      ).lean();

      if (!menu) continue;

      orderItems.push({
        name: menu.items[0].name,
        price: menu.items[0].price,
        quantity: Number(item.quantity),
      });
    }

    if (orderItems.length === 0) {
      return res.render("orders/create", {
        error: "Please select at least one valid menu item",
      });
    }

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await Order.create({
      user: req.user._id, // 👈 from session
      items: orderItems,
      total,
    });

    res.render("orders/create", {
      success: "Order created successfully",
    });
  } catch (err) {
    console.error(err);
    res.render("orders/create", {
      error: "Failed to create order",
    });
  }
};

// List all orders
export const listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name") // populate user name
      .lean();

    for (const order of orders) {
      order.displayId = order._id.toString().substring(0, 4);

      // ✅ Safe access
      order.customerName = order.user ? order.user.name : "Unknown";

      // console.log(
      //   "Order ID:",
      //   order.displayId,
      //   "User Name:",
      //   order.customerName
      // );
    }

    res.render("orders/list", { orders });
  } catch (err) {
    next(err);
  }
};

// Show edit order form
export const showEdit = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .lean();

    if (!order) return res.redirect("/orders");

    order.customerName = order.user ? order.user.name : "Unknown";

    const menus = await Menu.find().lean();

    res.render("orders/edit", { order, menus });
  } catch (err) {
    next(err);
  }
};

// Update an order
export const updateOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.render("orders/edit", {
        error: "Please select at least one item.",
      });
    }

    const orderItems = [];

    for (const item of items) {
      if (!item.menuItemId || item.quantity <= 0) continue;

      // Fetch menu item to get current price
      const menu = await Menu.findOne(
        { "items._id": item.menuItemId },
        { "items.$": 1 }
      ).lean();

      if (!menu) continue;

      orderItems.push({
        menuItemId: item.menuItemId, // keep reference for pre-selection
        name: menu.items[0].name,
        price: menu.items[0].price,
        quantity: Number(item.quantity),
      });
    }

    if (orderItems.length === 0) {
      return res.render("orders/edit", {
        error: "Please select at least one valid menu item.",
      });
    }

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Update the order in DB
    await Order.findByIdAndUpdate(req.params.id, {
      items: orderItems,
      total,
    });

    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .lean();

    order.customerName = order.user ? order.user.name : "Unknown";

    const menus = await Menu.find().lean();
    res.render("orders/edit", {
      order,
      menus,
      success: "Order updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    const orders = await Order.find().lean();

    if (!deletedOrder) {
      return res.render("orders/list", {
        orders,
        error: "Order not found ",
      });
    }

    res.render("orders/list", {
      orders,
      success: "Order deleted successfully ",
    });
  } catch (err) {
    next(err);
  }
};
