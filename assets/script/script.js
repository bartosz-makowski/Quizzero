const startButton = document.getElementById('button-start')
const continueButton = document.getElementById('button-continue')
const answer1 = document.getElementById('answer1')
const answer2 = document.getElementById('answer2')
const answer3 = document.getElementById('answer3')
const answer4 = document.getElementById('answer4')
const buttonRestart = document.getElementById('button-restart')

answer2.addEventListener('click', test)
answer3.addEventListener('click', test)
buttonRestart.addEventListener('click', test)


function test() {
    console.log('works hahah!')
}
