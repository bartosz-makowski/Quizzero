// dom sections consts
const welcomePage = document.getElementById('welcome')
const inputPage = document.getElementById('input');
const questionPage = document.getElementById('question')
const finalScorePage = document.getElementById('score');



const question = document.getElementById('question-text');
const choices = Array.from(document.getElementsByClassName('answer-text'));

let currentQuestion = {};
let awaitingAnswer = false;
let score = 0;
let questionNumber = 0;
let avabQuestions = [];

let questions = [
    {
        question: "who is your father ?",
        choice1: "voldemort",
        choice2: "Darth Vader",
        choice3: "twoj stary",
        choice4: "twoja stara",
        answer: 2,
    },

    {
        question: "why me ?",
        choice1: "because",
        choice2: "Yes",
        choice3: "gdzie ty",
        choice4: "co to sie stanelo ?",
        answer: 4,
    }
]

// points


const correctPoints = 10;


// buttons behaviour functions


const startButton = document.getElementById('button-start');
const beginButton = document.getElementById('button-continue');
const restartButton = document.getElementById('button-restart');

startButton.addEventListener('click', e => {
    welcomePage.classList.add('hide');
    inputPage.classList.remove('hide')
});

beginButton.addEventListener('click', e => {
    inputPage.classList.add('hide');
    questionPage.classList.remove('hide');
})



startGame = () => {
    questionNumber = 0;
    score = 0;
    avabQuestions = [...questions]
    newQuestion();
};

newQuestion = () => {
    /*if (avabQuestions.length === 0 || selectedAnswer !== question.answer) {
        //game end
        finalScorePage.classList.remove('hide');
        questionPage.classList.add('hide');
    }*/
    questionNumber++;
    questionIndex = Math.floor(Math.random() * avabQuestions.length);
    currentQuestion = avabQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    avabQuestions.splice(questionIndex, 1);

    awaitingAnswer = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!awaitingAnswers) return;

        awaitingAnswer = false;
        const selecteChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        newQuestion();
    });
});

startGame()