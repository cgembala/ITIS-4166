const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventControllers')


//get /stories: send all stories to the user
router.get('/', controller.index);

//GET /stories/new: send html for new story

router.get('/new', controller.new);

//POST /stories: create a new story

router.post('/', controller.create);

//GET /stories/:id: send details of story identified by id
router.get('/:id', controller.show);


//GET /stories/:id/editsend html form for editing
router.get('/:id/edit', controller.edit);


//PUT /stories/:id: update the story indentified by id
router.put('/:id', controller.update);

//DELETE /stories/:id, delete the story indentifdied by id
router.delete('/:id', controller.delete);

module.exports = router;