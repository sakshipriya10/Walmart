// models/Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
}, {
  timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
