const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

var users = require('./routes/users');
var question = require('./routes/question');
var vote = require('./routes/vote');

let db_config = {
  development: 'mongodb://ambodalle:alekoe123456@ds161262.mlab.com:61262/hacktiv8',
  test: 'mongodb://localhost/stack-test',
   // production: 'mongodb://ambodalle:alekoe123456@ds161262.mlab.com:61262/hacktiv8'
}

let app_env = app.settings.env;

mongoose.connect(db_config[app_env], function(err, res) {
  console.log('connected to database ' + db_config[app_env]);
});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/users', users);
app.use('/question', question);
app.use('/vote', vote);

app.listen(3000, ()=>{
     console.log('listening to port 3000');
});


module.exports = app;
