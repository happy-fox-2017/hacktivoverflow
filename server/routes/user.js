const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.findAll);
router.get('/:userId', userController.findOne);
router.post('/', userController.create);

router.post('/signin', userController.signIn);

module.exports = router;