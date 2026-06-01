const mongoose = require('mongoose');

const siteStatSchema = new mongoose.Schema({
  _id: { type: String, default: 'global' },
  totalVisits: { type: Number, default: 0 }
});

module.exports = mongoose.model('SiteStat', siteStatSchema);