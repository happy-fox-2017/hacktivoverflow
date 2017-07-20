var express = require('express');
var router = express.Router();
var cVerifyToken = require('../controller/cVerifyToken');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/verify/:token', cVerifyToken.verify);

module.exports = router;
