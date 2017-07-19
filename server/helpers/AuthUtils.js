const jwt = require('jsonwebtoken');

const TOKEN_PASSWORD = 'mypassword';

const isAuthenticated = function(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth.replace('Bearer ', '');

  jwt.verify(token, TOKEN_PASSWORD, function(err, decoded) {
    if (decoded) {
      next();
    } else {
      res.send('Unauthorized', 403);
    }
  });
};

module.exports = {
  isAuthenticated,
};
