/**
 * Created by y1275963 on 11/11/16.
 */
var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    questionquery: String,
    question: String,
    q_id: String,
    options: String
});

mongoose.model('Quiz', QuizSchema, 'questions');