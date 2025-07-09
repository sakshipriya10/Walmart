import express from "express";
import {
  addAddress,
  getUserAddresses,
  deleteAddress,
  getAddressById, // ✅ Add this
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/user/:userId", getUserAddresses);
router.get("/:id", getAddressById); // ✅ NEW ROUTE
router.delete("/:id", deleteAddress);

export default router;
