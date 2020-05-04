const Question = require('../models/Question');

exports.getAllQuestions = (req, res) => {
    const questions = Question.getAllQuestions();
    return res.status(200).send(questions);
};

exports.saveQuestion = (req, res) => {
    const {question, correctAnswer} = req.body;
    const createdQuestion = new Question(question, correctAnswer);
    Question.saveQuestion(createdQuestion);
    return res.status(200).send(createdQuestion);
};
exports.deleteQuestion = (req, res) => {
    const questionId = req.params.id;
    const code = Question.removeQuestionByID(questionId);
    res.status(code).send();
};
