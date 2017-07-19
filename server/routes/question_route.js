const Question = require('../controllers/question_control');
const veryfication = require('../helpers/token')
const router = require('express').Router();

router.get('/', Question.getAllItems);
router.get('/:id', Question.getOneItem);
router.post('/', veryfication.UserloginForPost, Question.createQuestion);
router.delete('/:id', veryfication.UserloginForPost, Question.deleteItem);
router.put('/answer/:id', Question.addAnswers);
router.put('/like/:id', veryfication.UserloginForPost, Question.addLikes);
router.put('/unlike/:id', veryfication.UserloginForPost, Question.removeLikes);

module.exports = router;