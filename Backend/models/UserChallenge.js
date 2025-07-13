//  const mongoose = require('mongoose');

// const challengeSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   challenges: {
//     categoriesPurchased: { type: Number, default: 0 },
//     productsReviewed: { type: Number, default: 0 },
//     sharedOnSocial: { type: Boolean, default: false }
//   },
//   pointsEarned: { type: Number, default: 0 }
// });

// module.exports = mongoose.model('UserChallenge', challengeSchema);

const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  challenges: {
    categoriesPurchased: { type: Number, default: 0 },     // 🛒 Buy from 3 categories
    productsReviewed: { type: Number, default: 0 },        // 📝 Review 5 products
    sharedOnSocial: { type: Boolean, default: false }      // 📤 Share once
  },

  pointsEarned: { type: Number, default: 0 },              // 🏅 Total points
  lastSpinDate: { type: Date, default: null }              // 🎯 For daily spin tracking
});

module.exports = mongoose.model('UserChallenge', challengeSchema);

