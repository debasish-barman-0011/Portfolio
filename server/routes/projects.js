const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', projectsController.getAll);
router.get('/admin', authMiddleware, projectsController.getAllAdmin);
router.post('/', authMiddleware, projectsController.create);
router.patch('/:id', authMiddleware, projectsController.update);
router.delete('/:id', authMiddleware, projectsController.delete);

module.exports = router;