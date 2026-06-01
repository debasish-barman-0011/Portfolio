const express = require('express');
const router = express.Router();
const controller = require('../controllers/lockerController');
const authMiddleware = require('../middleware/authMiddleware');
const lockerMiddleware = require('../middleware/lockerMiddleware');

router.get('/', authMiddleware, lockerMiddleware, controller.getAll);
router.post('/', authMiddleware, lockerMiddleware, controller.create);
router.delete('/:id', authMiddleware, lockerMiddleware, controller.delete);

module.exports = router;