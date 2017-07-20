var express = require('express');
var router = express.Router();
var threadController = require('../controllers/threadController');
var responseController = require('../controllers/responseController');
var auth = require('../controllers/auth')

router.get('/', threadController.get)
router.get('/:id/replies', threadController.getOne)
router.get('/:id/reply', responseController.get)
router.get('/:id/reply/:repid', responseController.getOne)
router.post('/', auth.userInfo, threadController.create)
router.post('/:id/reply', auth.userInfo, responseController.create)
router.put('/:id', auth.userInfo, threadController.update)
router.put('/:id/reply/:repid', auth.userInfo, responseController.update)
router.put('/:id/upvote', auth.userInfo, threadController.upvote)
router.put('/:id/reply/:repid/upvote', auth.userInfo, responseController.upvote)
router.put('/:id/downvote', auth.userInfo, threadController.downvote)
router.put('/:id/reply/:repid/downvote', auth.userInfo, responseController.downvote)
router.delete('/:id', threadController.remove)
router.delete('/:id/reply/:repid', responseController.remove)

module.exports = router;
