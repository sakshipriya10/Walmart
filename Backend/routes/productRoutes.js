 import express from "express";
import { getAllProducts , getProductById ,getTrendingProducts,} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts); 
router.get("/trending", getTrendingProducts); 
router.get("/:id", getProductById);// GET /api/products

export default router;
