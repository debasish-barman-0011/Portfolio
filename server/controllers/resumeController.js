const ResumeDownload = require('../models/ResumeDownload');

exports.logDownload = async (req, res) => {
  const { fullName, mobile, purpose } = req.body;
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({ message: 'Invalid mobile number' });
  }
  await ResumeDownload.create({ fullName, mobile, purpose, ip: req.ip });
  const downloadUrl = `https://docs.google.com/document/d/${process.env.RESUME_DOC_ID}/export?format=pdf`;
  res.json({ downloadUrl });
};

exports.getLogs = async (req, res) => {
  const logs = await ResumeDownload.find().sort('-createdAt');
  res.json(logs);
};