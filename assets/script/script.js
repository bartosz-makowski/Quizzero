// dom sections consts
const welcomePage = document.getElementById('welcome');
const inputPage = document.getElementById('input');
const questionPage = document.getElementById('question')
const finalScorePage = document.getElementById('score');

let loader = document.getElementById('loader');

let questionOrder = document.getElementById('question-number');
const question = document.getElementById('question-text');
const choices = Array.from(document.getElementsByClassName('answer-text'));

let currentQuestion = {};
let awaitingAnswer = false;
let score = 0;
let questionNumber = 0;
let avabQuestions = [];

let questions = [];

//Fetch API request


fetch("https://opentdb.com/api.php?amount=50&difficulty=easy")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map(loadedQuestion => {
            const workingQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            workingQuestion.answer = Math.floor(Math.random() *3) + 1;
            answerChoices.splice(workingQuestion.answer - 1, 0,
                loadedQuestion.correct_answer
            );
            
            answerChoices.forEach((choice, index) => {
                workingQuestion["choice" + (index + 1)] = choice;
            });

            return workingQuestion;
        });
        startGame();
    })
    .catch(err => {
        console.error(err);
    });

// points

const correctPoints = 10;

let usernameScore = document.getElementById('bestUserScore');
let userScore = document.getElementById('user-points');
let totalScore = document.getElementById('total-score');
let bestScore = document.getElementById('best-score');

// Using local storage

const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScore = JSON.parse(localStorage.getItem("bestScore")) || [];
localStorage.setItem("bestScore", JSON.stringify([]));
console.log(highScore);

// buttons behaviour functions


const startButton = document.getElementById('button-start');
const beginButton = document.getElementById('button-continue');
const restartButton = document.getElementById('button-restart');
const username = document.getElementById('username');

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
    userScore.innerText = 0;
    startGame();
});

username.addEventListener('keyup', () => {
    beginButton.disabled = !username.value;
});


startGame = () => {
    questionNumber = 0;
    score = 0;
    avabQuestions = [...questions]
    newQuestion();
    loader.classList.add('hide')
};

newQuestion = () => {
    questionNumber++;
    questionOrder.innerText = questionNumber;
    
    questionIndex = Math.floor(Math.random() * avabQuestions.length);
    currentQuestion = avabQuestions[questionIndex]
    question.innerText = currentQuestion["question"];

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
                totalScore.innerText = score;
                usernameScore.innerText = username.value;
                localStorage.setItem('mostRecentScore', score);
                endGame();
                saveBestScore();
                const mostRecentScore = localStorage.getItem('mostRecentScore');
                bestScore.innerText = mostRecentScore;
            };
            selectedChoice.classList.remove('button-wrong');
            score += 10;
            userScore.innerText = score;
            newQuestion();
        }, 1000);
        
    });
});

endGame = () => {
    finalScorePage.classList.remove('hide');
    questionPage.classList.add('hide');
};

function saveBestScore() {
    const score = {
        score: mostRecentScore,
        name: username.value
    };
console.log(score);
};