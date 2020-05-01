const name = window.prompt('Give me your name, so you could start :)');

const socket = window.io();

socket.emit('register', { name });
socket.on('error', (error) => {
    console.log(error);
});
socket.on('question', (data) => {
    console.log(data);
});
document.querySelector('button').addEventListener('click', () => {
    const answer = document.querySelector('input').value;

    socket.emit('answer', answer);
});
