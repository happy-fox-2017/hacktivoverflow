const jwt = require('jsonwebtoken');

let verify = (req,res) => {
  let id_token = req.params.token;
    jwt.verify(id_token, 'secret', function(err, result) {
    res.status(200).send(result)
  });
}

module.exports = {
    verify
};