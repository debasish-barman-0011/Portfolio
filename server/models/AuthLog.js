const mongoose = require('mongoose');

const authLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  action: { type: String, enum: ['login', 'logout', 'auto_logout'] },
  ip: String,
  userAgent: String
}, { timestamps: true });

module.exports = mongoose.model('AuthLog', authLogSchema);