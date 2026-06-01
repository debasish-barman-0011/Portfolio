module.exports = (req, res, next) => {
  const lockerToken = req.headers['x-locker-token'];
  if (!lockerToken || lockerToken !== process.env.LOCKER_SECRET) {
    return res.status(403).json({ success: false, message: 'Invalid locker token' });
  }
  next();
};