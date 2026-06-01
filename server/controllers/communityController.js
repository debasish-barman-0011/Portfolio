const CommunityMember = require('../models/CommunityMember');

exports.getApproved = async (req, res) => {
  const { page = 1, limit = 10, sort = 'latest' } = req.query;
  let sortOption = { createdAt: -1 };
  if (sort === 'oldest') sortOption = { createdAt: 1 };
  if (sort === 'az') sortOption = { fullName: 1 };
  if (sort === 'shuffle') sortOption = { fullName: 1 }; // pseudo shuffle
  const members = await CommunityMember.find({ status: 'approved' })
    .sort(sortOption)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const total = await CommunityMember.countDocuments({ status: 'approved' });
  res.json({ members, total, page, pages: Math.ceil(total / limit) });
};

exports.register = async (req, res) => {
  const { fullName, mobile, hometown, occupation, introduction } = req.body;
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({ message: 'Invalid mobile number' });
  }
  const member = new CommunityMember({ fullName, mobile, hometown, occupation, introduction, status: 'pending' });
  await member.save();
  res.status(201).json({ success: true });
};

exports.getPending = async (req, res) => {
  const pending = await CommunityMember.find({ status: 'pending' }).sort('-createdAt');
  res.json(pending);
};

exports.approve = async (req, res) => {
  await CommunityMember.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.json({ success: true });
};

exports.reject = async (req, res) => {
  await CommunityMember.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.update = async (req, res) => {
  const member = await CommunityMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(member);
};