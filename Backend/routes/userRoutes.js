import express from "express";
import { shareBonus } from "../controllers/userController.js";

import { getUserDetails } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/userDetails",verifyJWT, getUserDetails);
router.post('/share', shareBonus);

export default router;