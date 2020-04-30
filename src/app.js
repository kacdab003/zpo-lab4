const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = require('express')();

const server = http.Server(app);
const io = require('socket.io')(server);
const questionRouter = require('./routes/questions');
const Question = require('./models/Question');

const players = [];
const questionQueue = Question.getAllQuestions();
let playersCount = 0;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', questionRouter);
io.on('connection', (socket) => {
  playersCount += 1;
  io.emit('welcome', 'Welcome to the server!');
  socket.on('introduce', (data) => {});
  socket.on('disconnect', () => {
    playersCount -= 1;
    console.log('User left the game!');
    console.log(playersCount);
  });
});
io.on('', () => {});
server.listen(8080, () => {
  console.log('App is running on 8080');
});
