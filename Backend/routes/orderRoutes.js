import express from "express";
import { placeOrder, getUserOrders , cancelOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.get("/user/:userId", getUserOrders); // ✅ Add this route to get user orders
router.patch("/cancel/:id", cancelOrder); // ✅ Add this route to cancel an order

export default router;
