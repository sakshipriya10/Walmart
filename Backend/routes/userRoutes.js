import express from "express";
import { getUserDetails } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/userDetails",verifyJWT, getUserDetails);

export default router;