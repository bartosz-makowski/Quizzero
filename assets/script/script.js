// dom sections consts


const welcomePageRef = document.querySelector("#welcome");
const gameDetailPageRef = document.querySelector("#game-detail");
const questionPageRef = document.querySelector("#question")
const finalScorePageRef = document.querySelector("#score");
const correctPoints = 10;

const questionOrder = document.querySelector("#question-number");
const question = document.querySelector("#question-text");
const choices = Array.from(document.querySelectorAll(".answer-text"));

const bestUsername = document.querySelector("#bestUsername");
const userScoreRef = document.querySelector("#user-points");
const totalScoreRef = document.querySelector("#total-points");
const bestScoreRef = document.querySelector("#best-score");

const startButton = document.querySelector("#button-start");
const beginButton = document.querySelector("#button-continue");
const restartButton = document.querySelector("#button-restart");
const goBackButton = document.querySelector('#button-goback');
const username = document.querySelector("#username");
const dropdownNumber = document.querySelector('#questionAmount')


let score = 0;
let questionNumber = 0;
let bestScore = 0;

let currentQuestion = {};


let availableQ = [];
let questions = [];


const getQuestionAmount = () => {
    fetchMyData()
}

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
    let selectedAmount = dropdownNumber.options[dropdownNumber.selectedIndex].value;
    fetch(`https://opentdb.com/api.php?amount=${selectedAmount}&category=9&difficulty=easy&type=multiple`)
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


// startGame setting username to local storage 0 for score and queationNumber


const startGame = () => {
    localStorage.setItem('username', username.value);
    score = 0;
    questionNumber = 0
    availableQ = [...questions]
    newQuestion();
};


/**
 * Game starts
 * show new question
 * 
 */

const newQuestion = () => {
    if (availableQ.length === 0) { 
        endGame();
    } else {

        questionNumber++;
        questionOrder.innerText = questionNumber;
        
        
        const questionIndex = Math.floor(Math.random() * availableQ.length);
        currentQuestion = availableQ[questionIndex];
        question.innerHTML = currentQuestion['question'];

        choices.forEach( choice => {
            const number = choice.dataset.number;
            choice.innerHTML = currentQuestion['choice' + number];
        });
        availableQ.splice(questionIndex, 1);
    }    
}

/**
 * logic of what happens when answer is clicked
 */

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        disableAnswerButtons();
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

                //wrong answer selected

                totalScoreRef.innerText = score;
                enableAnswerButtons();
                endGame();
            } else {
                
                // correct answer selected

                score += 10;
                userScoreRef.innerText = score;
                enableAnswerButtons();
                console.log(score);
                if (bestScore < score) {
                    localStorage.setItem('bestScore', score)
                    localStorage.setItem('bestUsername', username.value)
                }
                newQuestion();
            }
        }, 1200);
        
    });
});

/**
 * disabling and enabling answers
 */

const disableAnswerButtons = () => {
   choices.forEach(choice => {
        choice.disabled = true;
   });
};


const enableAnswerButtons = () => {
    choices.forEach(choice => {
        choice.disabled = false;
   });
};

/**
 * hiding questions page and showing game summary
 */
const endGame = () => {
    finalScorePageRef.classList.remove('hide');
    questionPageRef.classList.add('hide');
    
};


/**
 * showing question page and getting new set of questions
 */

restartButton.addEventListener('click', e => {
    getAPI();
    finalScorePageRef.classList.add('hide');
    questionPageRef.classList.remove('hide');
    userScore.innerText = 0;
    
});


/**
 * showing game detail page to allow choice of new ammount of questions and changing name"
 */
goBackButton.addEventListener('click', e => {
    finalScorePageRef.classList.add('hide');
    gameDetailPageRef.classList.remove('hide');
});