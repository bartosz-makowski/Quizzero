// dom sections consts
const body = document.querySelector('#body');

const welcomePageRef = document.querySelector("#welcome");
const gameDetailPageRef = document.querySelector("#game-detail");
const questionPageRef = document.querySelector("#question")
const finalScorePageRef = document.querySelector("#score");
const correctPoints = 10;

const questionOrder = document.querySelector("#question-number");
const question = document.querySelector("#question-text");
const choices = Array.from(document.querySelectorAll(".answer-text"));
const buttons = Array.from(document.querySelectorAll('.button'));
const bestUsernameRef = document.querySelector("#bestUsername");
const userScoreRef = document.querySelector("#user-points");
const totalScoreRef = document.querySelector("#total-points");
const bestScoreRef = document.querySelector("#best-score");
const username = document.querySelector("#username");


const startButton = document.querySelector("#button-start");
const beginButton = document.querySelector("#button-continue");
const restartButton = document.querySelector("#button-restart");
const goBackButton = document.querySelector('#button-goback');

const lightModeChanger = document.querySelector('#lightThemeChanger');
const lightModeBtnRef = document.querySelector('#light_mode');
const darkModeChanger = document.querySelector('#darkThemeChanger');
const darkModeBtnRef = document.querySelector('#dark_mode')

const dropdownNumber = document.querySelector('#questionAmount')
const dropdownLevel = document.querySelector('#questionLevel')

let score = 0;
let questionNumber = 0;
let bestScore = localStorage.getItem('bestScore');
let currentQuestion = {};


let availableQ = [];
let questions = [];


/** 
 * welcome page
 * showing header
 * theme changers
 */

darkModeChanger.addEventListener('click', e => {
    darkModeBtnRef.classList.add('hide');
    lightModeBtnRef.classList.remove('hide');
    body.classList.add('body-dark');
    
    buttons.forEach(button => {
        button.classList.add('button-dark');
    });

    choices.forEach(choice => {
        choice.classList.add('button-dark')
    });
});

lightModeChanger.addEventListener('click', e => {
    lightModeBtnRef.classList.add('hide');
    darkModeBtnRef.classList.remove('hide');
    body.classList.remove('body-dark');

    buttons.forEach(button => {
        button.classList.remove('button-dark');
    });
    
    choices.forEach(choice => {
        choice.classList.remove('button-dark')
    });
})


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
    userScoreRef.innerText = 0;
    loader();
    getAPI();
});

username.addEventListener('keyup', () => {
    beginButton.disabled = !username.value;
});


/**
 * Fetch API request
 * get options from dropdown menus
*/

const getAPI = () => {
    let selectedLevel = dropdownLevel.options[dropdownLevel.selectedIndex].value;
    let selectedAmount = dropdownNumber.options[dropdownNumber.selectedIndex].value;
    fetch(`https://opentdb.com/api.php?amount=${selectedAmount}&category=9&difficulty=${selectedLevel}&type=multiple`)
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
        totalScoreRef.innerText = score; 
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
                let bestUsername = localStorage.getItem('bestUsername');
                let bestScore = localStorage.getItem('bestScore');
                bestUsernameRef.innerText = bestUsername;
                bestScoreRef.innerText = bestScore;
                console.log(bestScore);
                enableAnswerButtons();
                endGame();
            } else {
                
                // correct answer selected

                score += 10;
                userScoreRef.innerText = score;
                enableAnswerButtons();
                console.log(score);
                console.log(bestScore);
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
    loader();
    getAPI();
    finalScorePageRef.classList.add('hide');
    questionPageRef.classList.remove('hide');
    userScoreRef.innerText = 0
    
});


/**
 * showing game detail page to allow choice of new ammount of questions and changing name"
 */
goBackButton.addEventListener('click', e => {
    finalScorePageRef.classList.add('hide');
    gameDetailPageRef.classList.remove('hide');
    userScoreRef.innerText = 0
});

const loader = () => {
    question.innerText = "Loading question...";
    choices.forEach( choice => {
        choice.innerText = " ";
    });
};