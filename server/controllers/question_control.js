const Question = require('../models/questions');
var models = {};

models.getAllItems = function(req, res){
    Question.find({})
    .populate('answers')
    .exec((err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'terjadi kesalahan database, tidak bisa memuat data questions',
                error: err
            })
        } else {
            res.status(200)
            .send(result)
        }
    })
}

models.getOneItem = function(req, res){
    let id = req.params.id
    Question.findById(id)
    .populate('answers')
    .exec((err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'terjadi kesalahan database, tidak bisa menemukkan data questions',
                error: err
            })
        } else {
            res.status(200)
            .send(result)
        }
    })
}

models.createQuestion = function(req, res){
    let title = req.body.title,
        question = req.body.question,
        author = req.body.author,
        answers = [],
        like = [],
        unlike = [];
    Question.create({
        title: title,
        question: question,
        author: author,
        answers: answers,
        like: like,
        unlike: unlike
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'terjadi kesalahan database, tidak bisa memasukan data questions',
                error: err
            })
        } else {
            res.status(200)
            .send(result)
        }
    })
}

models.deleteItem = function(req, res){
    let id = req.params.id;
    Question.findByIdAndRemove(id, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Kesalahan, tidak bisa menghapus question',
                error: err
            })
        } else {
            res.send(result)
        }
    })
}

models.addAnswers = function(req, res){
    let id = req.params.id,
        answer = req.body.answerId;
    Question.findByIdAndUpdate(id, {
        $push: { answers: answer }
    }, {
        safe: true,
        upsert: true,
        new: true
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Kesalahan, tidak bisa menambah answer',
                error: err
            })
        } else {
            res.send(result)
        }
    })
}

models.addLikes = function(req, res){
    let id = req.params.id,
        like = req.body.like;
    Question.findByIdAndUpdate(id, {
        $push: { like: like }
    }, {
        safe: true,
        upsert: true,
        new: true
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Kesalahan, tidak bisa menambah like',
                error: err
            })
        } else {
            res.send(result)
        }
    })
}

models.removeLikes = function(req, res){
    let id = req.params.id,
        like = req.body.like;
    Question.findByIdAndUpdate(id, {
        $pull: { like: like }
    }, {
        safe: true,
        upsert: true
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Kesalahan, tidak bisa menambah like',
                error: err
            })
        } else {
            res.send(result)
        }
    })
}

module.exports = models;