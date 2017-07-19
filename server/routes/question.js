const express = require('express');
const AuthUtils = require('../helpers/AuthUtils');
const questionController = require('../controllers/question');

const isAuthenticated = AuthUtils.isAuthenticated;
const router = express.Router();

router.get('/', isAuthenticated, questionController.findAll);
router.get('/:questionId', questionController.findOne);
router.post('/', isAuthenticated, questionController.create);
router.post('/:questionId/answer', questionController.giveAnswer);
router.delete('/:questionId', questionController.delete);

module.exports = router;