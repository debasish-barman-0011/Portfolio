const mongoose = require('mongoose');

const communityMemberSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  hometown: String,
  occupation: String,
  introduction: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('CommunityMember', communityMemberSchema);