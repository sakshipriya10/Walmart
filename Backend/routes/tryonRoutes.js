// routes/tryonRoutes.js
import express from "express";
import multer from "multer";
import { tryCloth } from "../controllers/tryonController.js";

const router = express.Router();

// Save uploaded files to 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.png`);
  },
});

const upload = multer({ storage });

router.post("/", upload.fields([
  { name: "userImage", maxCount: 1 },
  { name: "itemImage", maxCount: 1 },
]), tryCloth);

export default router;
