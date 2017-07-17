const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const models = require('../models');

const should = chai.should();
chai.use(chaiHttp);

const QUESTIONS_URL = '/api/questions';

const newUser = {
  email: 'myyusuf1911@gmail.com',
  password: 'password',
  name: 'User 1',
};

describe('Test for answer', function() {

  beforeEach(function(done) {
    const query = { where: {} };
    models.Question.destroy(query)
    .then((destroyResult) => {
      models.Answer.destroy(query)
      .then((destroyAnswerResult) => {
        models.User.destroy(query)
        .then((destroyUserResult) => {
          done();
        })
        .catch(err => done(err));
      })
      .catch(err => done(err));
    })
    .catch(err => done(err));
  });

  it('should create answer without err', function(done) {
    const newQuestion = {
      title: 'title',
      content: 'content',
    };

    models.User.create(newUser)
    .then((createdUser) => {
      newQuestion.user = createdUser.id;
      models.Question.create(newQuestion)
      .then((createdQuestion) => {
        createdQuestion.setUser(createdUser)
        .then(() => {
          // models.Answer.create(newAnswer)
          // .then((createdAnswer) => {
          //   createdAnswer.setQuestion(createdQuestion)
          //   .then(() => {
          //     createdAnswer.setUser(createdUser);
          //   })
          // })

          const newAnswer = {
            content: 'content',
            question: createdQuestion.id,
            user: createdUser.id,
          };

          chai.request(app)
          .post(`${QUESTIONS_URL}/${createdQuestion.id}/answer`)
          .send(newAnswer)
          .end((err, res) => {
            console.log(err);
            should.not.exist(err);
            res.should.have.status(200);
            done();
          });
        });
      });
    });
  });
});
