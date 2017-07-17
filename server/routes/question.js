const express = require('express');
const questionController = require('../controllers/question');

const router = express.Router();

router.post('/', questionController.create);
router.post('/:questionId/answer', questionController.giveAnswer);

module.exports = router;