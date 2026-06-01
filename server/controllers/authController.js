const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AuthLog = require('../models/AuthLog');

const getValidSecretCodes = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);
  const hours = istDate.getUTCHours().toString().padStart(2, '0');
  const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
  const baseCode = hours + minutes;
  const codes = [baseCode];
  for (let delta = 1; delta <= 2; delta++) {
    const prevMin = new Date(istDate.getTime() - delta * 60000);
    const nextMin = new Date(istDate.getTime() + delta * 60000);
    const hPrev = prevMin.getUTCHours().toString().padStart(2, '0');
    const mPrev = prevMin.getUTCMinutes().toString().padStart(2, '0');
    const hNext = nextMin.getUTCHours().toString().padStart(2, '0');
    const mNext = nextMin.getUTCMinutes().toString().padStart(2, '0');
    codes.push(hPrev + mPrev, hNext + mNext);
  }
  return [...new Set(codes)];
};

exports.login = async (req, res) => {
  const { email, password, secretCode } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const validCodes = getValidSecretCodes();
    if (!validCodes.includes(secretCode)) {
      return res.status(401).json({ success: false, message: 'Invalid 2FA code' });
    }

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '1h' }
    );

    await AuthLog.create({
      adminId: admin._id,
      action: 'login',
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = async (req, res) => {
  await AuthLog.create({
    adminId: req.admin.id,
    action: 'logout',
    ip: req.ip,
    userAgent: req.headers['user-agent']
  });
  res.json({ success: true });
};

exports.verify = (req, res) => {
  res.json({ success: true, admin: req.admin });
};