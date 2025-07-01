 // routes/wishlistRoutes.js
import express from "express";
import {
  addItem,
  getWishlist,
  removeItem,
  moveToCart,
} from "../controllers/wishlistController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJWT, getWishlist);
router.post("/:productId", verifyJWT, addItem);
router.delete("/:productId", verifyJWT, removeItem);
router.post("/:productId/move-to-cart", verifyJWT, moveToCart);

export default router;
