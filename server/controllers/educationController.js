const Education = require('../models/Education');

exports.getAll = async (req, res) => {
  const edu = await Education.find().sort('year');
  res.json(edu);
};

exports.create = async (req, res) => {
  const edu = new Education(req.body);
  await edu.save();
  res.status(201).json(edu);
};

exports.delete = async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};