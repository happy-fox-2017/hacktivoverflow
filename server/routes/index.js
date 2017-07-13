var express = require('express');
var router = express.Router();
const userCont = require('../controllers/userController');
const questCont = require('../controllers/questController');


router.get('/users', userCont.getAll)
router.get('/users/:id', userCont.getOne)
router.post('/users/login', userCont.login)
router.post('/users/verify-token', userCont.verifyToken)
router.post('/users', userCont.create)
router.put('/users/:id', userCont.update)
router.delete('/users/:id', userCont.deleteOne)

router.get('/questions', questCont.getAll)
router.get('/questions/:id', questCont.getOne)
router.post('/questions', questCont.create)
router.put('/questions/:id', questCont.update)
router.delete('/questions/:id', questCont.deleteOne)
router.put('/questions/:id/vote/up', questCont.upVote)
router.put('/questions/:id/vote/down', questCont.downVote)

module.exports = router;
