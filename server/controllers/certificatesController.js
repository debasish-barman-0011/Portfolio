const Certificate = require('../models/Certificate');

exports.getAll = async (req, res) => {
  const items = await Certificate.find().sort('-createdAt');
  res.json(items);
};

exports.create = async (req, res) => {
  const item = new Certificate(req.body);
  await item.save();
  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

exports.delete = async (req, res) => {
  await Certificate.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};