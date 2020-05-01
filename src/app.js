const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = require("express")();

const server = http.Server(app);
const io = require("socket.io")(server);

const socketUtils = require("./utils/socket");
const questionRouter = require("./routes/questions");
const Question = require("./models/Question");
const Player = require("./models/Player");

const questions = Question.getAllQuestions();
const players = [];
const listeners = [];
let questionsLeft = questions.length;
console.log(questionsLeft);

questions.forEach((question) => {
  listeners.push({ event: "question", data: question });
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/api", questionRouter);
io.on("connection", (socket) => {
  // user registers to the game
  socket.on("register", (data) => {
    const player = new Player(data.name);
    socket.name = data.name;
    players.push(player);
    if (players.length === 2) {
      console.log("start");

      io.emit("question", questions[questions.length - questionsLeft]);
    }
  });
  socket.on("answer", (answer) => {
    console.log(answer, "player", socket.name);
  });
  socket.on("disconnect", () => {
    console.log("disconnect");
    const playerIndex = players.findIndex(
      (player) => player.name === socket.name
    );
    if (players.length !== 1) {
      players.splice(playerIndex, 1);
    }
    console.log(players);
  });
});

server.listen(8080, () => {
  console.log("App is running on 8080");
});
