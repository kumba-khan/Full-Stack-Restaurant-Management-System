import Menu from "../models/Menu.js";

// GET all menus
export const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find().lean();
    res.render("menu/list", { menus });
  } catch (err) {
    next(err);
  }
};

export const getMenuById = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id).lean();
    if (!menu) return res.redirect("/menu");
    res.render("menu/edit", { menu });
  } catch (err) {
    next(err);
  }
};

export const showCreateMenu = (req, res, next) => {
  try {
    const itemCount = [0, 1, 2, 3, 4];
    res.render("menu/create", { itemCount });
  } catch (err) {
    next(err);
  }
};

export const createMenu = async (req, res, next) => {
  try {
    const { title, items } = req.body;

    const menuItems = Object.values(items || {})
      .filter((item) => item.name && item.price)
      .map((item) => ({
        name: item.name,
        price: Number(item.price),
      }));

    await Menu.create({ title, items: menuItems });

    res.redirect("/menu");
  } catch (err) {
    next(err);
  }
};

// UPDATE menu
export const updateMenu = async (req, res, next) => {
  try {
    const { title, items, newItems } = req.body;

    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.redirect("/menu");

    const updatedItems = (items ? Object.values(items) : []).map((item) => ({
      _id: item._id,
      name: item.name,
      price: Number(item.price),
      quantity: item.quantity ? Number(item.quantity) : 1,
    }));

    //  Add new items
    if (newItems) {
      Object.values(newItems)
        .filter((i) => i.name && i.price)
        .forEach((i) => {
          updatedItems.push({
            name: i.name,
            price: Number(i.price),
            quantity: i.quantity ? Number(i.quantity) : 1,
          });
        });
    }

    menu.title = title;
    menu.items = updatedItems;
    await menu.save();

    res.render("menu/edit", {
      menu: menu.toObject(),
      newItemSlots: [{}, {}, {}, {}, {}],
      success: "Menu updated successfully!",
    });
  } catch (err) {
    res.render("menu/edit", {
      menu: Menu.toObject(),
      newItemSlots: [{}, {}, {}, {}, {}],
      error: "Failed to update menu ",
    });
  }
};

export const getMenuCards = async (req, res) => {
  try {
    const menuItems = [
      {
        name: "Chicken Fry",
        description: "Crispy Checken Fry.",
        image: "/images/images/chicken.png",
        price: 250,
      },
      {
        name: "Full chicken ",
        description: "Roasted Chicken.",
        image: "/images/images/roasted.png",
        price: 300,
      },
      {
        name: "Burger",
        description:
          "Fluffy pancakes served with maple syrup and fresh berries.",
        image: "/images/images/burger.png",
        price: 125,
      },
      {
        name: "Crumbs",
        description:
          "A refreshing mix of seasonal fruits with yogurt and honey.",
        image: "/images/images/crumbs.png",
        price: 150,
      },

      {
        name: "Fruit Bowl",
        description:
          "A refreshing mix of seasonal fruits with yogurt and honey.",
        image: "/images/images/fruitbowl.png",
        price: 200,
      },

      {
        name: "Sausage",
        description:
          "A refreshing mix of seasonal fruits with yogurt and honey.",
        image: "/images/images/sausage.png",
        price: 150,
      },

      {
        name: "Fish Pie ",
        description:
          "A refreshing mix of seasonal fruits with yogurt and honey.",
        image: "/images/images/fishpie.png",
        price: 75,
      },

      {
        name: "Egg & Trout Croissants",
        description:
          "Buttery croissants filled with smoked trout and soft scrambled eggs.",
        image: "/images/images/egg&trut.png",
        price: 125,
      },
      {
        name: "Avocado Toast",
        description:
          "Toasted sourdough topped with smashed avocado, eggs, and fresh tomatoes.",
        image: "/images/images/avocado-toast.png",
        price: 100,
      },
      {
        name: "Fruit Juice",
        description: "Whole fruit and natural fruit juice.",
        image: "/images/images/natural-Juice.png",
        price: 125,
      },
      {
        name: "fruit Juice",
        description:
          "Nutrition: The fruit dilemma – whole fruits vs. fruit juice",
        image: "/images/images/fruit-juice.png",
        price: 120,
      },

      {
        name: "Natural Juice",
        description: "A 100% natural Juice good for you.",
        image: "/images/images/natural-jiuce.png",
        price: 100,
      },

      {
        name: "Mixed Fruits",
        description: "Mixed fruit juice.",
        image: "/images/images/mixed-juice.png",
        price: 150,
      },

      {
        name: "Chips",
        description: "Crispy and Deliceous chips.",
        image: "/images/images/chipss.png",
        price: 100,
      },

      {
        name: "Set Of Snacks",
        description: "Crispy and Deliceous snacks.",
        image: "/images/images/Snacks.png",
        price: 125,
      },

      {
        name: "Set Of Snacks",
        description: "Crispy and Deliceous snacks.",
        image: "/images/images/Snacks.png",
        price: 300,
      },

      {
        name: "Chicken And Hummus Wrap",
        description: "Healthy chicken and Hummus Wraps.",
        image: "/images/images/chicken-wraps.png",
        price: 125,
      },

      {
        name: "Wraps",
        description: "Chicken and Avocado Wraps.",
        image: "/images/images/wrap.png",
        price: 200,
      },

      {
        name: "Vegetable wraps",
        description: "Crispy and Deliceous snacks.",
        image: "/images/images/vegetable-wrap.png",
        price: 150,
      },

      {
        name: "Benachin",
        description: "Delicious Benachin with Meat.",
        image: "/images/images/benachin.png",
        price: 150,
      },

      {
        name: "Jollof Rice",
        description: "Delicios Jollof Rice with Meat.",
        image: "/images/images/jollof-rice.png",
        price: 150,
      },

      {
        name: "Mbahal",
        description: "Senegambian dish made with groundnut and rice.",
        image: "/images/images/Mbahal.png",
        price: 150,
      },
    ];

    res.render("menu/menu-cards", {
      title: "Menu Cards",
      menuItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load menu cards");
  }
};

// showEditMenu controller
export const showEditMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id).lean();
    if (!menu) return res.redirect("/menu");

    const newItemSlots = [{}, {}, {}, {}, {}];

    res.render("menu/edit", { menu, newItemSlots });
  } catch (err) {
    next(err);
  }
};

// DELETE menu
export const deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);

    const menus = await Menu.find().lean();

    if (!deletedMenu) {
      return res.render("menu/list", {
        menus,
        error: "Menu not found ",
      });
    }

    res.render("menu/list", {
      menus,
      success: "Menu deleted successfully ✅",
    });
  } catch (err) {
    const menus = await Menu.find().lean();

    res.render("menu/list", {
      menus,
      error: "Failed to delete menu ❌",
    });
  }
};

// DELETE a single food item from a menu
export const deleteMenuItem = async (req, res) => {
  try {
    const { menuId, itemId } = req.params;

    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.render("menu/list", {
        error: "Menu not found ",
      });
    }

    menu.items = menu.items.filter((item) => item._id.toString() !== itemId);

    await menu.save();

    res.render("menu/edit", {
      menu: menu.toObject(),
      newItemSlots: [{}, {}, {}, {}, {}],
      success: "Menu item deleted successfully ",
    });
  } catch (err) {
    res.render("menu/edit", {
      error: "Failed to delete menu item ",
    });
  }
};
