// dom sections consts


const welcomePageRef = document.querySelector("#welcome");
const gameDetailPageRef = document.querySelector("#game-detail");
const questionPageRef = document.querySelector("#question")
const finalScorePageRef = document.querySelector("#score");
const correctPoints = 10;

const questionOrder = document.querySelector("#question-number");
const question = document.querySelector("#question-text");
const choices = Array.from(document.querySelectorAll(".answer-text"));

const maxHighScores = 5;
const usernameScore = document.querySelector("#UsernameScore");
const userScore = document.querySelector("#user-points");
const totalScore = document.querySelector("#total-score");
const bestScore = document.querySelector("#best-score");

const startButton = document.querySelector("#button-start");
const beginButton = document.querySelector("#button-continue");
const restartButton = document.querySelector("#button-restart");
const goBackButton = document.querySelector('#button-goback');
const username = document.querySelector("#username");


let score = 0;
let questionNumber = 0;
let mostRecentScore = score;

let currentQuestion = {};


let availableQ = [];
let questions = [];

/** 
 * welcome page
 * showing header
 */


startButton.addEventListener('click', e => {
    welcomePageRef.classList.add('hide');
    gameDetailPageRef.classList.remove('hide')
});


/**
 * Game details page
 * collecting username and questions amount
 */


beginButton.addEventListener('click', e => {
    gameDetailPageRef.classList.add('hide');
    questionPageRef.classList.remove('hide');
    getAPI();
});

username.addEventListener('keyup', () => {
    beginButton.disabled = !username.value;
});


//Fetch API request


const getAPI = () => {
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
};


// startGame


const startGame = () => {
    localStorage.setItem('username', username.value);
    score = 0;
    questionNumber = 0
    availableQ = [...questions]
    newQuestion();
};


/**
 * Game starts
 * show new question and answers
 * 
 */

const newQuestion = () => {
    questionNumber++;
    questionOrder.innerText = questionNumber;
    
    
    questionIndex = Math.floor(Math.random() * availableQ.length);
    currentQuestion = availableQ[questionIndex];
    question.innerHTML = currentQuestion['question'];

    choices.forEach( choice => {
        const number = choice.dataset.number;
        choice.innerHTML = currentQuestion['choice' + number];
    });
    availableQ.splice(questionIndex, 1);

}

/**
 * logic of what happens when answer is clicked
 */

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        if (selectedAnswer == currentQuestion.answer) {
            selectedChoice.classList.add('button-correct');
        } else {
            selectedChoice.classList.add('button-wrong');
        };
        setTimeout( () => {
            selectedChoice.classList.remove('button-wrong');
            selectedChoice.classList.remove('button-correct');
            if (selectedAnswer != currentQuestion.answer) {
                totalScore.innerText = score;
                const bestUser = localStorage.getItem('username')
                usernameScore.innerText = bestUser;
                const mostRecentScore = localStorage.getItem('mostRecentScore');
                bestScore.innerText = mostRecentScore;
                endGame();
            } else {
                score += 10;
                userScore.innerText = score;
                //localStorage.setItem('mostRecentScore', score);
                console.log(score)
                if (mostRecentScore < score) {
                    localStorage.setItem('mostRecentScore', score)
                    localStorage.setItem('username', username.value)
                }
                newQuestion();
            }
            
        }, 1200);
        
    });
});

const endGame = () => {
    finalScorePageRef.classList.remove('hide');
    questionPageRef.classList.add('hide');
    
};


restartButton.addEventListener('click', e => {
    getAPI();
    finalScorePageRef.classList.add('hide');
    questionPageRef.classList.remove('hide');
    userScore.innerText = 0;
    
});


