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

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
const port = normalizePort(process.env.PORT || '3000');

app.listen(port, function () {
  console.log('App listening on port 3000!')
});

module.exports = app;