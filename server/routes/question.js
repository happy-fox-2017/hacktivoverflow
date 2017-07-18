const express =  require('express')
const router = express.Router()
const Question = require('../controllers/question')
const jwtHelper = require('../helper/jwtHelpers')

router.post('/',  Question.createQuestion)
router.get('/', Question.sowAllQuestion)
router.get('/:id', Question.sowOneQuestion)
router.put('/:id',  Question.updateQuestion)
router.delete('/:id/:userid', Question.deleteQuestion)

router.post('/sub', Question.createQuestion_sub)
router.put('/:id/:userid', Question.updateQuestion_sub)
router.delete('/:id/:answerid/:userid/',  Question.deleteQuestion_sub)

module.exports = router
