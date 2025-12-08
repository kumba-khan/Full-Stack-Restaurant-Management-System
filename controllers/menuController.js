import Menu from "../models/Menu.js";

export const createMenu = async (req, res, next) => {
  try {
    const { title, items } = req.body;

    const existingMenu = await Menu.findOne({ title });
    if (existingMenu) {
      return res
        .status(400)
        .json({ message: "Menu with this title already exist" });
    }

    const menu = await Menu.create({ title, items });

    res.status(201).json({ message: "menu created successfullly", menu });
  } catch (err) {
    next(err);
  }
};
//Add food items to existing food Menu
export const addFoodItem = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items Array is required" });
    }

    for (let item of items) {
      if (!item.name || item.price == null) {
        return res
          .status(400)
          .json({ message: "Food name and price are required" });
      }
    }

    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ message: "Menu not Found" });
    }

    menu.items.push(...items);
    await menu.save();

    res.status(200).json({ message: "Item/s added successfully", menu });
  } catch (err) {
    next(err);
  }
};

// Get all menus
export const getMenu = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    res.status(200).json({ message: "Menu Card:", menus });
  } catch (err) {
    next(err);
  }
};

//Get menu by Id
export const getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu Not found" });
    }
    return res.status(200).json({ message: "Menu Found", menu });
  } catch (err) {
    next(err);
  }
};

//Update a Menu
export const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateMenu = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateMenu) {
      return res.status(404).json({ message: "Menu not Updated" });
    }

    res.status(400).json({ message: "Menu Updated Successfully", updateMenu });
  } catch (err) {
    next(err);
  }
};

//Deleting a food menu
export const deleteMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `Menu ${menu.title} Deleted Successfully` });
  } catch (err) {
    next(err);
  }
};
