const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true },
  description: { type: String, required: true, maxlength: 300 },
  sequence: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  bannerUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);