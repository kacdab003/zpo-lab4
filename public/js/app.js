const name = prompt('Give me your name, so I could sign you up for the quiz');
const socket = io();
let answer = null;

const answerInput = document.querySelector('.answers');
answerInput.addEventListener('change', (e) => {
    answer = e.target.value;
    console.log(answer);
})
socket.on('welcome', (message) => {
    console.log(message)
})
socket.emit('introduce', {name});
socket.on('question', (data) => {
    console.log(data)
    answer = null;
    answerInput.value = null;
    const questionContent = document.querySelector('.question-content');
    const answers = document.querySelector('.answers');
    const answersOptions = document.querySelectorAll('.answers option')
    const answerListItems = document.querySelectorAll('ul li');
    questionContent.textContent = data.question;
    for (let i = 0; i < data.answers.length; i++) {
        answerListItems[i].textContent = data.answers[i];
        answersOptions[i].value = data.answers[i];
        answersOptions[i].textContent = data.answers[i];

    }


})
document.querySelector('button').addEventListener('click', () => {
    console.log(answer, ' sent')
    socket.emit('answer', {username: name, answer: answer});
})
