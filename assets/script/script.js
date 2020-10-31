// dom sections consts
const welcomePage = document.getElementById('welcome');
const inputPage = document.getElementById('input');
const questionPage = document.getElementById('question')
const finalScorePage = document.getElementById('score');
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

let currentQuestion = {};
let awaitingAnswer = false;
let questionNumber = 0;
let avabQuestions = [];
let questions = [];
let score = 0;




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





// Using local storage


let mostRecentScore = score;
const highScore = JSON.parse(localStorage.getItem("bestScore")) || [];
localStorage.setItem("bestScore", JSON.stringify([]));


// buttons behaviour functions


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
                console.log(score);
                const mostRecentScore = localStorage.getItem('mostRecentScore');
                console.log(mostRecentScore);
                bestScore.innerText = mostRecentScore;
                saveBestScore();
                console.log(mostRecentScore);
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
    highScore.push(score);

    highScore.sort( (a,b) => {
        return b.score - a.score
    });
    highScore.splice(5);

    localStorage.setItem('highScore', JSON.stringify(highScore));
    console.log(highScore);
    console.log(mostRecentScore);
    console.log(score);
};
