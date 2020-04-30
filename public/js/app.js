const name = prompt('Give me your name, so I could sign you up for the quiz');
if (!name) location.reload();
const socket = io();

socket.emit('introduce', name);
