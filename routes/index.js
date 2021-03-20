var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todoController');
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', todoController.index);

router.get('/add', todoController.add);
router.post('/add',[ body('title').notEmpty()], todoController.create);
router.post('/edit/:id',[ body('title').notEmpty()], todoController.edit);

router.post('/actions', todoController.actions);


module.exports = router;
