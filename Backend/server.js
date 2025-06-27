import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; 
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// MongoDB connection
connectDB();

// ✅ Fix: backticks for console log string
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));