var express = require('express');
var router = express.Router();
const userCont = require('../controllers/userController');
const questCont = require('../controllers/questController');


router.get('/api/users', userCont.getAll)
router.get('/api/users/:id', userCont.getOne)
router.post('/auth/users/login', userCont.login)
router.post('/auth/users/verify-token', userCont.verifyToken)
router.post('/api/users', userCont.create)
router.put('/api/users/:id', userCont.update)
router.delete('/api/users/:id', userCont.deleteOne)

router.get('/api/questions/a', questCont.getAllLiterally)
router.get('/api/questions', questCont.getAll)
router.get('/api/questions/:id', questCont.getOne)
router.get('/api/questions/user/:username', questCont.getByUser)
router.post('/api/questions', questCont.create)
router.put('/api/questions/:id', questCont.update)
router.delete('/api/questions/:id', questCont.deleteOne)
router.put('/api/questions/:id/vote/up', questCont.upVote)
router.put('/api/questions/:id/vote/down', questCont.downVote)

module.exports = router;
