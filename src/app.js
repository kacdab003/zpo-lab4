const express = require('express');
const http = require('http');

const app = require('express')();

const server = http.Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
io.on('connection', () => {
  console.log('User has been connected');
});

server.listen(8080, () => {
  console.log('App is running on 8080');
});
