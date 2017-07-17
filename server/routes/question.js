const express = require('express');
const questionController = require('../controllers/question');

const router = express.Router();

router.post('/', questionController.create);

module.exports = router;