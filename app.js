import express from "express";
import session from "express-session";
import methodOverride from "method-override";

import { engine } from "express-handlebars";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { errorHandler } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

// connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.static("public"));

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    extname: ".handlebars",
    helpers: {
      inc: (value) => parseInt(value) + 1,
      eq: (a, b) => a === b,
    },
  }),
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Routes
app.use("/auth", authRoutes);
app.use("/", dashboardRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4500;

// app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is humming on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
