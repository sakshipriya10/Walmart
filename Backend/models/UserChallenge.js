 const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  challenges: {
    categoriesPurchased: { type: Number, default: 0 },
    productsReviewed: { type: Number, default: 0 },
    sharedOnSocial: { type: Boolean, default: false }
  },
  pointsEarned: { type: Number, default: 0 }
});

module.exports = mongoose.model('UserChallenge', challengeSchema);
