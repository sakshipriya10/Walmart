import express from 'express';
import { handleSpin } from '../controllers/spinController.js';

const router = express.Router();

router.post('/spin', handleSpin);

export default router;

