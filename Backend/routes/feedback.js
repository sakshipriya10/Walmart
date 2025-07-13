// routes/feedback.js
import express from 'express';
import { submitFeedback,getFeedbackByProduct } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/', submitFeedback);
router.get('/:productId', getFeedbackByProduct);

export default router;
