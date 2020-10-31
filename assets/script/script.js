// dom sections consts


const welcomePageRef = document.getElementById('welcome');
const gameDetailPageRef = document.getElementById('game-detail');
const questionPageRef = document.getElementById('question')
const finalScorePageRef = document.getElementById('score');
const loader = document.getElementById('loader');
const correctPoints = 10;

const questionOrder = document.getElementById('question-number');
const question = document.getElementById('question-text');
const choices = Array.from(document.getElementsByClassName('answer-text'));

const maxHighScores = 5;
const usernameScore = document.getElementById('bestUserScore');
const userScore = document.getElementById('user-points');
const totalScore = document.getElementById('total-score');
const bestScore = document.getElementById('best-score');

const startButton = document.getElementById('button-start');
const beginButton = document.getElementById('button-continue');
const restartButton = document.getElementById('button-restart');
const username = document.getElementById('username');


let score = 0;

let currentQuestion = {};
let awaitingAnswer = false;
let questionNumber = 0;
let availableQ = [];
let questions = [];





//Fetch API request


fetch("https://opentdb.com/api.php?amount=50&difficulty=easy")
    .then(res => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
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




// Using local storage


let mostRecentScore = score;
const highScore = JSON.parse(localStorage.getItem('bestScore')) || [];
localStorage.setItem('bestScore', JSON.stringify([]));


const storeGame = (username, highscore) => {
    localStorage.setItem('username', username.value);
    localStorage.setItem('highscore', highscore);
};

const getHighScore = () => {
    return localStorage.getItem('highscore');
}; 


// buttons behaviour functions


startButton.addEventListener('click', e => {
    welcomePageRef.classList.add('hide');
    gameDetailPageRef.classList.remove('hide')
});

beginButton.addEventListener('click', e => {
    gameDetailPageRef.classList.add('hide');
    questionPageRef.classList.remove('hide');
});

restartButton.addEventListener('click', e => {
    finalScorePageRef.classList.add('hide');
    questionPageRef.classList.remove('hide');
    userScore.innerText = 0;
    startGame();
});

username.addEventListener('keyup', () => {
    beginButton.disabled = !username.value;
});


const answerChoices = () => {
    const answerChoices = [...loadedQuestion.incorrect_answers];
            workingQuestion.answer = Math.floor(Math.random() *3) + 1;
            answerChoices.splice(workingQuestion.answer - 1, 0,
                loadedQuestion.correct_answer
            );
            
            answerChoices.forEach((choice, index) => {
                workingQuestion["choice" + (index + 1)] = choice;
            });
            return workingQuestion;
};


const startGame = () => {
    score = 0;
    questionNumber = 0
    availableQ = [...questions]
    newQuestion();
    loader.classList.add('hide')
};

const newQuestion = () => {
    questionNumber++;
    questionOrder.innerText = questionNumber;
    
    questionIndex = Math.floor(Math.random() * availableQ.length);
    currentQuestion = availableQ[questionIndex]
    question.innerHTML = currentQuestion["question"];

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });
    availableQ.splice(questionIndex, 1);

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
                const mostRecentScore = localStorage.getItem('mostRecentScore');
                bestScore.innerText = mostRecentScore;
                getHighScore();
                saveBestScore();
            };
            selectedChoice.classList.remove('button-wrong');
            score += 10;
            userScore.innerText = score;
            newQuestion();
        }, 1200);
        
    });
});

const endGame = () => {
    finalScorePageRef.classList.remove('hide');
    questionPageRef.classList.add('hide');
};

const saveBestScore = () => {
    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScore.push(score);

    highScore.sort( (a,b) => {
        return b.score - a.score
    });
    highScore.splice(5);

    localStorage.setItem('highScore', JSON.stringify(highScore));
};
