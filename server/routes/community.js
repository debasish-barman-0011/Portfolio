const express = require('express');
const router = express.Router();
const controller = require('../controllers/communityController');
const authMiddleware = require('../middleware/authMiddleware');
const { communityRegLimiter } = require('../middleware/rateLimiters');

router.get('/approved', controller.getApproved);
router.post('/register', communityRegLimiter, controller.register);
router.get('/pending', authMiddleware, controller.getPending);
router.patch('/:id/approve', authMiddleware, controller.approve);
router.patch('/:id/reject', authMiddleware, controller.reject);
router.patch('/:id', authMiddleware, controller.update);

module.exports = router;