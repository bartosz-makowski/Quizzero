// dom sections consts
const welcomePage = document.getElementById('welcome')
const inputPage = document.getElementById('input');
const questionPage = document.getElementById('question')
const finalScorePage = document.getElementById('score');


let questionOrder = document.getElementById('question-number');
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

let userScore = document.getElementById('user-points');
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
});

restartButton.addEventListener('click', e => {
    finalScorePage.classList.add('hide');
    questionPage.classList.remove('hide');
    startGame();
});



startGame = () => {
    questionNumber = 0;
    score = 0;
    avabQuestions = [...questions]
    newQuestion();
};

newQuestion = () => {
    questionNumber++;
    questionOrder.innerText = questionNumber;
    
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
        
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        if (selectedAnswer == currentQuestion.answer) {
            selectedChoice.classList.add('button-correct');
        } else {
            selectedChoice.classList.add('button-wrong');
        };
        setTimeout( () => {
            selectedChoice.classList.remove('button-correct');
            if (selectedAnswer != currentQuestion.answer) {
                endGame();
            };
            selectedChoice.classList.remove('button-wrong');
            userScore.innerText = score += 10;
            newQuestion();
        }, 1000);
        
    });
});

endGame = () => {
    finalScorePage.classList.remove('hide');
    questionPage.classList.add('hide');
};
startGame()