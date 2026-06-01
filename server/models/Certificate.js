const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  description: String,
  imageUrl: String   // Google Photos or any public image URL
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);