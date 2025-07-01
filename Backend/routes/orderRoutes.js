import express from "express";
import { handlePurchase } from "../controllers/orderController.js";

const router = express.Router();

router.post("/purchase", handlePurchase);

export default router;
