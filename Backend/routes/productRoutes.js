 import express from "express";
import { getAllProducts , getProductById ,getTrendingProducts,getRelatedProducts} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts); 
router.get("/trending", getTrendingProducts); 
router.get("/:id", getProductById);// GET /api/products
router.get("/related/:productId", getRelatedProducts);

export default router;
