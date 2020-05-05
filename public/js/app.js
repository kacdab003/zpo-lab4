const name = prompt('Give me your name, so I could sign you up for the quiz');
const socket = io();
socket.emit('introduce', name);
const counterParagraph = document.querySelector('.counter');
socket.on('welcome', (data) => {
    document.querySelector('.question-content').textContent = data.question
    counterParagraph.textContent = data.counter
})
socket.on('question', (data => {
    document.querySelector('.question-content').textContent = data.question
    counterParagraph.textContent = data.counter
}))
socket.on('game over', results => {
    let html = '';
    results.forEach(player => {

        html += `<div>
<p>${player.name}</p>
<p>${player.score}</p>
</div>`
        document.querySelector('.btn').disabled = true;
        // document.querySelector('.input').disabled = true;
        document.querySelector('p').innerHTML = html


    })
    counterParagraph.textContent = results.counter;
    console.log(results.counter);
})

const emitAnswer = () => {
    const input = document.querySelector('input');
    const answer = input.value;
    socket.emit('answer', {name, answer})
    input.value = '';
}

const sendBtn = document.querySelector('.btn');
document.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) { //enter click
        emitAnswer();
    }

});
sendBtn.addEventListener('click', emitAnswer)
