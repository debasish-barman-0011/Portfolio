const mongoose = require('mongoose');

const resumeDownloadSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  purpose: { type: String, enum: ['To Explore', 'To Recruit', 'Collaboration', 'IT Consultation', 'Group Project', 'Others'] },
  ip: String
}, { timestamps: true });

module.exports = mongoose.model('ResumeDownload', resumeDownloadSchema);