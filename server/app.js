const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/user');
const questionRouter = require('./routes/question');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});

module.exports = app;