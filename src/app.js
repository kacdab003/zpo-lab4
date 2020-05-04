const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = require('express')();

const server = http.Server(app);
const io = require('socket.io')(server);
const questionRouter = require('./routes/questions');
const Question = require('./models/Question');
const Player = require('./models/Player')

const players = [];
const questionQueue = Question.getAllQuestions();
let currQuestion = questionQueue.pop();
let counter = questionQueue.length + 1;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', questionRouter);
io.on('connection', (socket) => {
    socket.emit('welcome', {question: currQuestion.question, counter});
    socket.on('introduce', (name) => {
        const player = new Player(name);
        player.id = socket.id;
        socket.name = name;
        players.push(player);
    })
    socket.on('answer', ({name, answer}) => {
        const isCorrect = currQuestion.correctAnswer === answer;
        if (isCorrect) {
            if (questionQueue.length === 0) {
                return io.sockets.emit('game over', players,counter);
            } else {
                const playerAnswered = players.find(player => player.name === name);
                playerAnswered.scorePoint();
                console.log(playerAnswered.name, 'scored a point!')
                currQuestion = questionQueue.pop();
                counter-=1;
                io.sockets.emit('question', {question: currQuestion.question, counter});

            }


        }


    })
    socket.on('disconnect', () => {
        console.log(socket.id, 'left the game!')
        players.filter(player => player.id !== socket.id)


    })

})
server.listen(8080, () => {
    console.log('Server runs on port ');
});