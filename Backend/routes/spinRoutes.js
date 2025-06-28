import express from "express";
import { spinWheel } from "../controllers/spinController.js";
// import { protect } from "../middleware/authMiddleware.js"; // if using auth

const router = express.Router();
router.post("/spin", spinWheel);


export default router;
