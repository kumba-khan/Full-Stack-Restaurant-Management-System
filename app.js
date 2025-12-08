import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { errorHandler } from "./middleware/errorHandlebars.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

// ERROR HANDLER (always last)
app.use(errorHandler);

// SERVER
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
