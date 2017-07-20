var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var auth = require('../controllers/auth')

router.get('/', userController.get)

router.post('/', userController.create)

router.put('/:id', auth.authUser, userController.update)

router.delete('/:id', auth.authUser, userController.remove)

module.exports = router;
