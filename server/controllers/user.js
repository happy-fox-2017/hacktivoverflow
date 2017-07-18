const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');

const saltRounds = 10;
const TOKEN_PASSWORD = 'mypassword';

const sendLoginFailedMessage = (req, res) => {
  res.send('Invalid username or password', 403);
};


exports.create = function createUser(req, res) {
  const userData = req.body;
  const password = userData.password;

  bcrypt.genSalt(saltRounds, (errSalt, salt) => {
    bcrypt.hash(password, salt, (errHahg, hash) => {
      userData.password = hash;
      models.User.create(userData)
      .then((result) => {
        res.json({ result });
      })
      .catch((errCreateUser) => {
        res.status(500).send(errCreateUser.message);
      });
    });
  });
};

exports.findAll = function findAllUser(req, res) {
  models.User.findAll({ where: {} })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

exports.findOne = function findOneUser(req, res) {
  const userId = req.params.userId;
  models.User.find({ where: { id: userId } })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

exports.signIn = function signIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  models.User.findOne({
    where: { email },
  })
  .then((user) => {
    if (user !== null) {
      bcrypt.compare(password, user.password, (err, bcryptResult) => {
        if (bcryptResult) {
          const token = jwt.sign({
            email: user.email,
            role: user.role,
          }, TOKEN_PASSWORD);
          res.send({
            email: user.email,
            name: user.name,
            userId: user.id,
            token,
          });
        } else {
          sendLoginFailedMessage(req, res);
        }
      });
    } else {
      sendLoginFailedMessage(req, res);
    }
  })
  .catch((errFindUser) => {
    console.log(errFindUser);
    sendLoginFailedMessage(req, res);
  });
};
