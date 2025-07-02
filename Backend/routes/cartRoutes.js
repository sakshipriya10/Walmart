// routes/cartRoutes.js
import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJWT, getCart);
router.post("/:productId", verifyJWT, addToCart);
router.delete("/:productId", verifyJWT, removeFromCart);

export default router;
