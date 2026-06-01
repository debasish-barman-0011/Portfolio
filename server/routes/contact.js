const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');
const { contactLimiter } = require('../middleware/rateLimiters');

router.post('/', contactLimiter, controller.submit);
router.get('/', authMiddleware, controller.getAll);
router.delete('/:id', authMiddleware, controller.delete);

module.exports = router;