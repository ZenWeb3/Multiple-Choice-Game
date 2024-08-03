
//Defining consts for the progress bar, score, questions
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choiceText"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

//defining variables for questions object, answers, booleans, and question array
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

//question objects for the quiz
let questions = [
    {
      question: "What is the capital city of France?",
      choice1: "Berlin",
      choice2: "Madrid",
      choice3: "Paris",
      choice4: "Rome",
      choice5: "Lisbon",
      answer: 3
    },
    {
      question: "Which planet is known as the Red Planet?",
      choice1: "Earth",
      choice2: "Mars",
      choice3: "Jupiter",
      choice4: "Saturn",
      choice5: "Venus",
      answer: 2,
    },
    {
      question: "What is the largest ocean on Earth?",
      choice1: "Atlantic Ocean",
      choice2: "Indian Ocean",
      choice3: "Southern Ocean",
      choice4: "Pacific Ocean",
      choice5: "Arctic Ocean",
      answer: 4
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      choice1: "William Shakespeare",
      choice2: "Charles Dickens",
      choice3: "Mark Twain",
      choice4: "Jane Austen",
      choice5: "Leo Tolstoy",
      answer: 1
    },
    {
      question: "What is the chemical symbol for water?",
      choice1: "O2",
      choice2: "CO2",
      choice3: "H2O",
      choice4: "N2",
      choice5: "CH4",
      answer: 3
    }
  ];
  

const $ScorePoints = 100;
const $MaxQuestions = 5;

//the function to display different questions
const startGame = () => {
  questionCounter = 0;
  score = 0;
  avaliableQuestions = [...questions];
  getNewQuestion();
};

// using localstorage API to store the scores of players in the browser. localstorage is an API provided by browsers that allows you to store small amount of data even when browser is closed.

//this function keeps track of the score
const getNewQuestion = () => {
  if (avaliableQuestions.length === 0 || questionCounter > $MaxQuestions) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  //a math operation to display the question number after picking an answer
  questionCounter++
  progressText.textContent = `Question ${questionCounter} of ${$MaxQuestions}`
  progressBarFull.style.width = `${(questionCounter/$MaxQuestions) *100}%`

  const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[questionIndex];
  question.textContent = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.textContent = currentQuestion["choice" + number];
  });

  avaliableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};


// Afunction to carry out certain events when a choice has been selected
choices.forEach(choices => {
  choices.addEventListener("click", e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === 'correct') {
        incrementScore($ScorePoints)
    }

    selectedChoice.parentElement.classList.add(classToApply);

    // a time function to delay execution of the question selection when choiced is picked 
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
    }, 1000) //delay time 1second

  });

});

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
