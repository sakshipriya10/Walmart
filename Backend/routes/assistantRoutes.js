import express from "express";
import { handleAssistantQuery } from "../controllers/assistantController.js";

const router = express.Router();
router.post("/", handleAssistantQuery);

export default router;
