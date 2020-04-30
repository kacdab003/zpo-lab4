const express = require('express');
const questionsController = require('../controllers/question');

const router = express.Router();
router.get('/get', questionsController.getAllQuestions);
router.post('/add', questionsController.saveQuestion);
router.delete('/remove/:id', questionsController.deleteQuestion);

module.exports = router;
