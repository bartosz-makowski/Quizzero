// Buttons consts


const startButton = document.getElementById('button-start')
const continueButton = document.getElementById('button-continue')
const answer1 = document.getElementById('answer1')
const answer2 = document.getElementById('answer2')
const answer3 = document.getElementById('answer3')
const answer4 = document.getElementById('answer4')
const answerButtons = document.getElementById('answer-buttons')
const restartButton = document.getElementById('button-restart')

// Sections consts


const welcome = document.getElementById('welcome')
const input = document.getElementById('input')
const question = document.getElementById('question')
const finalScore = document.getElementById('score')


// Questions

let questionNumber = document.getElementById('question-number')
let questionText = document.getElementById('question-text')
let currentQuestion = {};
let answerDelay = true;
let questionNumber = 0;
let avabQuestions = [];
const correctPoints = 10;

let shuffledQuestions, currentQuestionIndex



// Functions

startGame = () => {
    questionNumber = 0;
    score = 0;
    avaialableQuestions = [...questions];
    
}

fetch("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    }).then(loadedQuestions => {
        console.log(loadedQuestions.results);
       // questions = loadedQuestions;
       questions = loadedQuestions.results.map(loadedQuestion => {
           const formattedQuestion = {
               question: loadedQuestion.question
           };
           const answerChoices = [...loadedQuestion.incorrect_answers]
           formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
           answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestions.correcr_answer);

           answerChoices.forEach((choice, index) => {
               formattedQuestion["choice" + (index+1)] = choice;
           });
       })
    });
    //.catch(err => {
    //    console.error('err');
    //});


startButton.addEventListener('click', start)

function start() {
    welcome.classList.add('hide')
    input.classList.remove('hide')
}


continueButton.addEventListener('click', begin)

function begin() {
    input.classList.add('hide')
    question.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    startGame();
}


restartButton.addEventListener('click', restart)

function restart() {
    finalScore.classList.add('hide')
    input.classList.remove('hide')
    question.classList.add('hide')
    startGame = () => {
    questionNumber = 0;
    score = 0;
    avaialableQuestions = [...questions];
    newQuestion();
}

}

function newQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
}



function showQuestion(question) {
    questionText.innerText = loadedQuestion.question
    question.answers.forEach(answer => {
        let myDiv = document.createElement('div')
        myDiv.classList.add('col-xs-12')
        myDiv.classList.add('col-md-6')
        myDiv.classList.add('text-center')
        myDiv.classList.add('align-self-center')
        myDiv.classList.add('grid')
        answerButtons.appendChild(myDiv)
        let button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        myDiv.appendChild(button)
    });
}







//temporary questions to test functionality before adding API

let questions = [];
  /* {
      question: 'What is 2 + 2',
      answers: [
          { text: '4', correct: true, },
          { text: '6', correct: false, },
          { text: '0', correct: false},
          { text: '22', correct: false},
      ]
    },
    {
        question: 'How many months do we have in a year',
        answers: [
            { text: '18', correct: false},
            { text: '12', correct: true},
            { text: '10', correct: false},
            { text: '24', correct: false},
        ]
    }
];
*/
