const Achievement = require('../models/Achievement');

exports.getAll = async (req, res) => {
  const items = await Achievement.find().sort('-createdAt');
  res.json(items);
};

exports.create = async (req, res) => {
  const item = new Achievement(req.body);
  await item.save();
  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

exports.delete = async (req, res) => {
  await Achievement.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};