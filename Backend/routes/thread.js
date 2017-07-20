const express = require('express');
const router = express.Router();
const cThread = require('../controller/cThread');

/* GET Thread listing. */
router.get('/', cThread.Thread_get)
router.post('/', cThread.Thread_post)
router.put('/:id', cThread.Thread_put)
router.delete('/:id', cThread.Thread_delete)

module.exports = router;