const express = require('express');
const controller = require('../controllers/noteController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', controller.getNotes);
router.post('/', controller.createNote);
router.delete('/:id', controller.deleteNote);

router.put('/:id', authMiddleware, controller.updateNote);

module.exports = router;