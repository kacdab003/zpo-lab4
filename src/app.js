const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = require('express')();

const server = http.Server(app);
const io = require('socket.io')(server);
const questionRouter = require('./routes/questions');
const Question = require('./models/Question');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', questionRouter);
io.on('connection', () => {
  console.log('User has been connected');
  io.emit('message', 'Welcome to the server!');
});

server.listen(8080, () => {
  console.log('App is running on 8080');
});
