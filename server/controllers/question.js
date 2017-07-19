
const models = require('../models');

exports.findAll = function findAllQuestions(req, res) {
  models.Question.findAll(
    {
      where: {},
      include: [
        {
          model: models.Answer,
        },
        {
          model: models.User,
        },
      ],
    })
  .then((queryResult) => {
    const userId = req.tokenPayload.userId;


    const result = queryResult.map((questionObj) => {
      const question = questionObj.toJSON();
      if (userId === question.User.id) {
        question.canDelete = true;
      } else {
        question.canDelete = false;
      }
      return question
    });
    res.json(result);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

exports.findOne = function findOneUser(req, res) {
  const questionId = req.params.questionId;
  models.Question.find(
    {
      where: { id: questionId },
      include: [
        {
          model: models.Answer,
        },
        {
          model: models.User,
        },
      ],
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

exports.create = function createQuestion(req, res) {
  const questionData = req.body;
  const tokenPayload = req.tokenPayload;
  models.User.findOne({
    where: {
      id: tokenPayload.userId,
    },
  })
  .then((foundUser) => {
    models.Question.create({
      title: questionData.title,
      content: questionData.content,
    })
    .then((createdQuestion) => {
      createdQuestion.setUser(foundUser)
      .then((result) => {
        res.json(result);
      });
    });
  });
};

exports.delete = function deleteUser(req, res) {
  const questionId = req.params.questionId;
  models.Question.destroy(
    {
      where: { id: questionId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

exports.giveAnswer = function createUser(req, res) {
  const answerData = req.body;
  models.User.findOne({
    where: {
      id: answerData.user,
    },
  })
  .then((foundUser) => {
    models.Question.findOne({
      where: {
        id: answerData.question,
      },
    })
    .then((foundQuestion) => {
      models.Answer.create({
        content: answerData.content,
      })
      .then((createdAnswer) => {
        createdAnswer.setUser(foundUser)
        .then(() => {
          foundQuestion.addAnswer(createdAnswer)
          .then((result) => {
            res.json(result);
          });
        });
      });
    });
  });
};
