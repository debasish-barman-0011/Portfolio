const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', controller.getAll);
router.get('/all', controller.getAllFull);
router.post('/', authMiddleware, controller.create);
router.patch('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

module.exports = router;