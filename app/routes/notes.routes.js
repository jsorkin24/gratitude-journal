const router = require('express').Router();
const notesController = require('../controllers/note.controller')();

const path = require('path');
module.exports = router;

// api routes ===========================================================
router.get('/', notesController.getAll)
router.get('/:id', notesController.getOneById)
router.post('/', notesController.insert)
router.put('/:id', notesController.updateById)
router.delete('/:id', notesController.removeById)