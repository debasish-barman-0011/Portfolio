const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  level: { type: String, enum: ['School', 'Higher Secondary', 'Undergraduate', 'Postgraduate', 'Certification'] },
  year: String,
  institute: String,
  description: String,
  bannerUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);