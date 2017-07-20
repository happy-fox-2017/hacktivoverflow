const express = require('express');
const router = express.Router();
const cReply = require('../controller/cReply');

/* GET reply listing. */
router.get('/', cReply.Reply_get)
router.post('/', cReply.Reply_post)
// router.put('/:id', cReply.reply_put)
// router.delete('/:id', cReply.reply_delete)

module.exports = router;