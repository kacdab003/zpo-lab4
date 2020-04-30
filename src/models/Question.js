const fs = require('fs');
const path = require('path');
const { uuid } = require('uuidv4');

const QUESTIONS_SRC_PATH = path.join(
  __dirname,
  '..',
  '..',
  'data',
  'questions.json'
);
console.log(QUESTIONS_SRC_PATH);

class Question {
  constructor(question, answers, correctIndex) {
    this.id = uuid();
    this.question = question;
    this.answers = answers;
    this.correctIndex = correctIndex;
  }

  static getAllQuestions() {
    const questions = JSON.parse(
      fs.readFileSync(QUESTIONS_SRC_PATH).toString()
    );
    return questions;
  }

  static saveQuestion(question) {
    const questions = Question.getAllQuestions();
    console.log(questions);

    questions.push(question);
    fs.writeFileSync(QUESTIONS_SRC_PATH, JSON.stringify(questions));
  }

  static removeQuestionByID(id) {
    let questions = Question.getAllQuestions();
    console.log(id);
    const filteredQuestions = questions.filter(
      (question) => question.id !== id
    );
    fs.writeFileSync(QUESTIONS_SRC_PATH, JSON.stringify(filteredQuestions));
    return filteredQuestions.length === questions.length ? 404 : 200;
  }
}
module.exports = Question;
