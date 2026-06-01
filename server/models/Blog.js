const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  tagline: String,
  description: String,
  bannerUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);