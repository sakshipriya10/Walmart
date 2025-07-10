import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; 
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tryonRoutes from "./routes/tryonRoutes.js"; 
import wishlistRoutes from "./routes/wishlistRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import challengeRoutes from "./routes/challengeRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";

import morgan from "morgan";

import spinRoutes from './routes/spinRoutes.js';

import addressRoutes from "./routes/addressRoutes.js";
import assistantRoutes from "./routes/assistantRoutes.js";
import feedbackRoutes from './routes/feedback.js';
import challengeRoutes from "./routes/challengeRoutes.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true,
}));
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/address", addressRoutes);

app.use("/api/assistant", assistantRoutes);
app.use("/api/challenges", challengeRoutes);


// app.use(cors({
//   origin: 'http://localhost:5173',  //  Vite runs on this
//   credentials: true
// }));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api', spinRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tryon", tryonRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/challenges", challengeRoutes);

app.use("/api/cart", cartRoutes);
app.use('/api/feedback', feedbackRoutes);


// MongoDB connection
connectDB();

// ✅ Fix: backticks for console log string
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

