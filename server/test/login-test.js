const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = require('../app');

const models = require('../models');


const should = chai.should();
chai.use(chaiHttp);

const SIGNIN_URL = '/api/users/signin';
const saltRounds = 10;

const newUser = {
  email: 'myyusuf1911@gmail.com',
  password: 'password',
  name: 'User 1',
};

describe('Test for user', function() {

  before(function(done) {
    const query = { where: {} };
    models.User.destroy(query)
    .then((destroyResult) => {
      const userToCreate = {
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
      };
      bcrypt.genSalt(saltRounds, (errSalt, salt) => {
        bcrypt.hash(userToCreate.password, salt, (errHahg, hash) => {
          userToCreate.password = hash;
          models.User.create(userToCreate)
          .then((createUserResult) => {
            done();
          })
          .catch((errCreateUser) => {
            done(errCreateUser);
          });
        });
      });
    })
    .catch(destroyUserErr => done(destroyUserErr));
  });

  it('should return valid jwt token', function(done) {
    chai.request(app)
    .post(SIGNIN_URL)
    .send(newUser)
    .end((err, res) => {
      console.log(err);
      should.not.exist(err);
      res.should.have.status(200);
      done();
    });
  });

});
