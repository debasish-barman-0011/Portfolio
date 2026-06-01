const Contact = require('../models/Contact');

exports.submit = async (req, res) => {
  const { name, email, message } = req.body;
  const contact = new Contact({ name, email, message, ip: req.ip });
  await contact.save();
  res.status(201).json({ success: true });
};

exports.getAll = async (req, res) => {
  const messages = await Contact.find().sort('-createdAt');
  res.json(messages);
};

exports.delete = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};