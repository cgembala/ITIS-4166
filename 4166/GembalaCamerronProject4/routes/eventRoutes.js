const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventControllers')
const {fileUpload} = require('../middleware/fileUpload')
const {isLoggedIn, isAuthor} = require('../middleware/auth');
const {validateId} = require('../middleware/validator');

//get /stories: send all stories to the user
router.get('/', controller.index);

//GET /stories/new: send html for new story

router.get('/new', isLoggedIn, controller.new);

// /POST /stories create a new story
router.post('/', fileUpload, controller.create);

//GET /stories/:id: send details of story identified by id
router.get('/:id',  validateId, controller.show);


//GET /stories/:id/editsend html form for editing
router.get('/:id/edit',  isLoggedIn, validateId, isAuthor, controller.edit);


//PUT /stories/:id: update the story indentified by id
router.put('/:id',  isLoggedIn, validateId, isAuthor, fileUpload, controller.update);

//DELETE /stories/:id, delete the story indentifdied by id
router.delete('/:id',  isLoggedIn, validateId, isAuthor, controller.delete);

module.exports = router;