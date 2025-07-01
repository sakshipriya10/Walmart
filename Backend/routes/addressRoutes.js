import express from "express";
import { addAddress, getUserAddresses } from "../controllers/addressController.js";
import { deleteAddress } from "../controllers/addressController.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/user/:userId", getUserAddresses);
router.delete("/:id", deleteAddress);

export default router;