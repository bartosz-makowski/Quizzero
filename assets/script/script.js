const question = document.getElementById('question-text');
const choices = Array.from(document.getElementsByClassName('answer-text'));

let currentQuestion = {};
let awaitingQuestion = true;
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

startGame = () => {
    questionNumber = 0;
    score = 0;
    avabQuestions = [...questions]
    newQuestion();
};

newQuestion = () => {
    questionNumber++;
    questionIndex = Math.floor(Math.random() * avabQuestions.length);
    currentQuestion = avabQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
}

startGame()