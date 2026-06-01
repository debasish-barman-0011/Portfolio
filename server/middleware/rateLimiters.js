const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts, try again later' }
});

exports.contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Contact form limit reached. Try after an hour.' }
});

exports.communityRegLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  message: { success: false, message: 'Registration limit reached. Try later.' }
});

exports.resumeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Resume download limit reached. Try after an hour.' }
});

exports.visitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1,
  message: { success: false, message: 'Too many requests' }
});