const express = require('express');
const router = express.Router();
const controller = require('../controllers/statsController');
const authMiddleware = require('../middleware/authMiddleware');
const { visitLimiter } = require('../middleware/rateLimiters');

router.post('/visit', visitLimiter, controller.visit);
router.get('/', authMiddleware, controller.getAllStats);

module.exports = router;