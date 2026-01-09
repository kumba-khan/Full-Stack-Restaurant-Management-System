import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Registration Function
export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.render("auth/register", { error: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.render("auth/register", { error: "Passwords do not match." });
    }

    const exists = await User.findOne({ email }).lean();
    if (exists) {
      return res.render("auth/register", { error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    res.render("auth/login", {
      success: "Registration successful! Please login.",
    });
  } catch (err) {
    console.error(err);
    res.render("auth/register", { error: "Something went wrong. Try again." });
  }
};

// Login Function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.render("auth/login", { error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("auth/login", { error: "Invalid password." });
    }

    // Save user in session
    req.session.user = user;

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
//l Logout Function
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");
    res.redirect("/auth/login");
  });
};
