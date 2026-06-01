const LockerDocument = require('../models/LockerDocument');

exports.getAll = async (req, res) => {
  const docs = await LockerDocument.find().sort('-createdAt');
  res.json(docs);
};

exports.create = async (req, res) => {
  const doc = new LockerDocument(req.body);
  await doc.save();
  res.status(201).json(doc);
};

exports.delete = async (req, res) => {
  await LockerDocument.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};