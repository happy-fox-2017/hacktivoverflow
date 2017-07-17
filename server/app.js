const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

//mongoose config
const mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/hacktiv-overflow-1';
mongoose.Promise('bluebird');
mongoose.connect(url, (err)=>{
    if(err) console.log(err);
    console.log('you are conected on url: ', url);
})

//file routes declar..
var user = require('./routes/user_route');
var question = require('./routes/question_route');
var answer = require('./routes/answer_route');

//express declare
var app = express()

//cors and body-parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router set..
app.use('/api/user', user);
app.use('/api/question', question);
app.use('/api/answer', answer);

app.listen(process.env.PORT, ()=>{
    console.log('connection on port: ', process.env.PORT)
});

module.exports = app;
