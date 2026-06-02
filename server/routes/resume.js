const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');
const { resumeLimiter } = require('../middleware/rateLimiters');

router.post('/log', resumeLimiter, controller.logDownload);
router.get('/logs', authMiddleware, controller.getLogs);
router.delete('/logs/:id', authMiddleware, controller.deleteLog);

module.exports = router;