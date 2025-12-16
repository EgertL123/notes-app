const express = require('express');
const controller = require('../controllers/noteController');

const router = express.Router();
router.delete('/:id', controller.deleteNote);

module.exports = router;
