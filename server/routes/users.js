const express = require('express');
const router = express.Router();
const User = require('../controllers/users');
const jwtHelper = require('../helper/jwtHelpers')

router.post('/signup', User.SignUp);
router.post('/signin', User.SignIn);

router.get('/', jwtHelper.validate, User.findAllUsers);
router.get('/:id', jwtHelper.validate, jwtHelper.validate, User.findOneUser);
router.put('/:id', jwtHelper.validate, User.updateUser);
router.delete('/:id', jwtHelper.validate, User.deleteUser);


module.exports = router;
