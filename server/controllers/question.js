
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
          model: models.Vote,
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
          include: [
            {
              model: models.User,
            },
          ],
        },
        {
          model: models.Vote,
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
  const questionId = req.params.questionId;
  const answerData = req.body;
  const userId = req.tokenPayload.userId;

  models.User.findOne({
    where: {
      id: userId,
    },
  })
  .then((foundUser) => {
    models.Question.findOne({
      where: {
        id: questionId,
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

exports.giveVote = function createUser(req, res) {
  const questionId = req.params.questionId;
  const voteData = req.body;
  const userId = req.tokenPayload.userId;

  models.User.findOne({
    where: {
      id: userId,
    },
  })
  .then((foundUser) => {
    models.Question.findOne({
      where: {
        id: questionId,
      },
      include: [
        {
          model: models.Vote,
          include: [
            {
              model: models.User,
            },
          ],
        },
      ],
    })
    .then((foundQuestion) => {

      if (voteData.score === 1) {

        const votes = foundQuestion.Votes;
        const votesBySameUser = votes.find((theVote) => {
          return theVote.User.id === userId;
        });

        if (!votesBySameUser) {
          models.Vote.create({
            score: 1,
          })
          .then((createdVote) => {
            createdVote.setUser(foundUser)
            .then(() => {
              foundQuestion.addVote(createdVote)
              .then((result) => {
                res.json(result);
              });
            });
          });
        } else {
          res.json({ status: 'OK' });
        }
      } else {
        const votes = foundQuestion.Votes;
        let voteFound = false;
        for (let i = 0; i < votes.length; i += 1) {
          const vote = votes[i];
          console.log('------->', vote);
          if (vote.User.id === userId) {
            voteFound = true;
            foundQuestion.removeVote(vote)
            .then(() => {
              res.json({ status: 'OK' });
            });
            break;
          }
        }

        if (!voteFound) {
          res.json({ status: 'OK' });
        }
      }
    });
  });
};
