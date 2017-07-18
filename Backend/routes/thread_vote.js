const express = require('express');
const router = express.Router();
const cThread_vote = require('../controller/cThread_vote');

router.get('/',cThread_vote.thread_vote_get)
router.post('/',cThread_vote.thread_vote_post)

module.exports = router;