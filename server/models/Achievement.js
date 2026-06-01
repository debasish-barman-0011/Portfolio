const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: String,
  tagline: String,
  description: String,
  bannerUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);