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
let playersCount = 0;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', questionRouter);
io.on('connection', (socket) => {
    playersCount += 1;
    io.emit('welcome', 'Welcome to the server!');
    socket.on('introduce', (data) => {
        const player = new Player(data.name);
        players.push(player);
        const playerIndex = players.length - 1;
        console.log(players);
        socket.playerIndex = playerIndex;
        if (players.length > 1) {
            console.log('Game starts')
            emitQuestions(io, socket, questionQueue).then(data => console.log(players))
        }
    });


    socket.on('disconnect', () => {
        playersCount -= 1;
        console.log('User left the game!');
        console.log(playersCount);

    });
});

server.listen(8080, () => {
    console.log('App is running on 8080');
});
const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
const emitQuestions = async (io, socket, questions) => {
    for (let i = 0; i < questions.length; i++) {
        io.emit('question', {
            question: questions[i].question,
            answers: questions[i].answers,
            answer: questions[i].answers[questions[i].correctIndex]
        });
        socket.on('answer', (data) => {
            console.log(socket.playerIndex)
                if (data.answer === questions[i].answers[questions[i].correctIndex] && !questions[i].isLocked) {
                    players[socket.playerIndex].scorePoint();
                    questions[i].isLocked = true;
                    console.log('Question passed answer is good ', players[socket.playerIndex].anme + ' scores a point', players)
                } else {
                    if (!questions[i].isLocked) {
                        players[socket.playerIndex].substractPoint();
                        console.log('Question passed answer is bad ', players[socket.playerIndex].name + ' loses a point', players)
                    }

                }
            }
        )
        await sleep(10000);


    }
}