const Answer = require('../controllers/answer_control');
const veryfication = require('../helpers/token')
const router = require('express').Router();

router.get('/', Answer.getAllItems);
router.get('/:id', Answer.getOneItem);
router.post('/', veryfication.UserloginForPost, Answer.createAnswer);
router.delete('/:id', veryfication.UserloginOnly, Answer.deleteItem);
router.put('/answer/like/:id', veryfication.UserloginForPost, Answer.addLikes);
router.put('/answer/unlike/:id', veryfication.UserloginForPost, Answer.removeLikes);

module.exports = router;