const express = require('express');
const controller = require('../controllers/noteController');

const router = express.Router();
router.get('/', controller.getNotes);
router.post('/', controller.createNote);
router.delete('/:id', controller.deleteNote);

module.exports = router;
