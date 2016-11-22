var express = require('express');
var router = express.Router();
var events = require('events');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
require('../models/Comments');
require('../models/Posts');
require('../models/Quiz');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Quiz = mongoose.model('Quiz');

var mysql = require('mysql');

var connection = mysql.createConnection({
});

router.get('/test_http', function(req, res) {
  var EventEmitter = events.EventEmitter;
  var flowController = new EventEmitter();


  flowController.on('dowork', function(obj) {
    connection.query(obj["questionquery"], function (err, row) {
      connection.query(obj['options'], function (err, options) {
        if (err) console.log(err);
          console.log(obj['question']);
          // res.send({results: [{"question":obj['question']},
        //     {"answer":[row[0], options[0],options[1],options[2]]}]});//options
        res.json({"question":obj['question'],
          "answer":[row[0], options[0],options[1],options[2]]});//options
      });
    });
  });

    Quiz.findOne({"q_id": '1'}, function(err, obj) {
    var temp = obj['questionquery'];
    console.log(obj['questionquery']);
    flowController.emit('dowork', obj);
  })

  flowController.on('finished', function () {
    console.log('finished');
  });

  // Quiz.findOne({"_id": "58263d70444584131d257309"}, function(err, obj) {
  //   console.log(obj['sql_query']);
  //   console.log(obj['question']);
  //   connection.query(obj['sql_query'], function (err, rows) {
  //         res.send({results: rows});
  //       }
  //   );
  // });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.get('/posts', function(req, res, next){
  Post.find(function(err, posts){
    if(err){return next(err); }

    res.json(posts);
  });
});

router.param('post', function(req, res, next, id){
  var query = Post.findById(id);

  query.exec(function(err, post){
    if(err) {return next(err);}
    if(!post) {return next(new Error('Can\'t find post for id'))}

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res){
  res.send(req.params);
  // res.json(req.post);
})

module.exports = router;
