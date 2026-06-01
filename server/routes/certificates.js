const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificatesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', controller.getAll);
router.post('/', authMiddleware, controller.create);
router.patch('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

module.exports = router;