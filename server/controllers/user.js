const models = require('../models');

exports.create = function createUser(req, res) {
  models.User.create(req.body)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(500).send(err.message);
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