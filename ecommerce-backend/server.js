import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
// You can add other routes like products, cart, orders, etc.

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// CORS
if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: "*", credentials: true }));
} else {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}

app.use(morgan("dev"));

// API routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("✅ API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
