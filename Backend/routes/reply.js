const express = require('express');
const router = express.Router();
const cReply = require('../controller/cReply');

/* GET users listing. */
router.get('/', cReply.reply_get)
router.post('/', cReply.reply_post)
router.put('/:id', cReply.reply_put)
router.delete('/:id', cReply.reply_delete)

module.exports = router;