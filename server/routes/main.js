var express = require('express');
var router = express.Router();
var conn = require('../controllers/main_c')


// QUESTIONS
// post questions
router.post('/questions', conn.postQuestion);

// get all questions
router.get('/questions', conn.getAllQuestions);

// get best questions
router.get('/questions/best', conn.getBestQuestions);

//get one questions
router.get('/questions/:question_id', conn.getOneQuestion);

//edit question
router.put('/questions/:question_id', conn.editQuestion);

// delete question
router.delete('/questions/:question_id', conn.destroyQuestion);

// like question
router.put('/questions/:question_id/like', conn.likeQuestion);

// dislike question
router.put('/questions/:question_id/dislike', conn.dislikeQuestion);




// ANSWERS
// get answers of particular questions
router.get('/questions/:question_id/answers', conn.findAllAnswers);

// post answers
router.post('/questions/:question_id/answers', conn.postAnswer);

//edit answer (PENDING)
// router.put('/questions/:question_id/answers/:user_id', );

// delete answer (PENDING)
// router.delete('/questions/:question_id/answers/:user_id', );

// like answer
router.put('/questions/:question_id/answers/:answers_id/like', conn.likeAnswers);

// dislike answer
router.put('/questions/:question_id/answers/:answers_id/dislike', conn.dislikeAnswers);





module.exports = router;
