const Question = require('../models/Question');

exports.getAllQuestions = (req, res, next) => {
  const questions = Question.getAllQuestions();
  return res.status(200).send(questions);
};

exports.saveQuestion = (req, res, next) => {
  const { question, answers, correctIndex } = req.body;
  const createdQuestion = new Question(question, answers, correctIndex);
  Question.saveQuestion(createdQuestion);
  return res.status(200).send(createdQuestion);
};
exports.deleteQuestion = (req, res, next) => {
  const questionId = req.params.id;
  const code = Question.removeQuestionByID(questionId);
  res.status(code).send();
};
