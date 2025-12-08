import Menu from "../models/Menu.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const { customerName, items } = req.body;

    // 1. Get the restaurant menu
    const menu = await Menu.findOne(); // assuming only one menu exists
    if (!menu) return res.status(400).json({ message: "Menu not found." });

    let validatedItems = [];
    let total = 0;

    // 2. Validate each order item
    for (let orderItem of items) {
      const menuItem = menu.items.find(
        (i) => i.name.toLowerCase() === orderItem.name.toLowerCase()
      );

      if (!menuItem) {
        return res.status(400).json({
          message: `Item '${orderItem.name}' is not available in the menu`,
        });
      }

      // Use price from the menu (ignore price from frontend)
      const fixedItem = {
        name: menuItem.name,
        price: menuItem.price,
        quantity: orderItem.quantity,
      };

      validatedItems.push(fixedItem);

      // Update total
      total += menuItem.price * orderItem.quantity;
    }

    // 3. Create order
    const order = await Order.create({
      customerName,
      items: validatedItems,
      total,
    });
    res.status(200).json({ message: "Order successful", order });
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};
