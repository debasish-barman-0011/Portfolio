const mongoose = require('mongoose');

const lockerDocumentSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,   // public viewable URL (Google Drive link)
  fileType: { type: String, enum: ['pdf', 'jpeg', 'jpg'] },
  isPrivate: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LockerDocument', lockerDocumentSchema);