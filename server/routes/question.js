const express = require('express');
const AuthUtils = require('../helpers/AuthUtils');
const questionController = require('../controllers/question');

const isAuthenticated = AuthUtils.isAuthenticated;
const router = express.Router();

router.get('/', isAuthenticated, questionController.findAll);
router.get('/:questionId', isAuthenticated, questionController.findOne);
router.post('/', isAuthenticated, questionController.create);
router.post('/:questionId/answer', isAuthenticated, questionController.giveAnswer);
router.post('/:questionId/vote', isAuthenticated, questionController.giveVote);
router.delete('/:questionId', isAuthenticated, questionController.delete);

module.exports = router;