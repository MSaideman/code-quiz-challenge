// global variables
var timer = document.getElementById("timer");
var quizBody = document.getElementById("quiz");
var startHeader = document.querySelector("h2");
var startPage = document.getElementById("startpage");
var startBtn = document.getElementById("startQuiz");
var questionsIn = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var questionsEl = document.getElementById("question-placeholder");
var resultsEl = document.getElementById("result");
var gameoverDiv = document.getElementById("gameover");
var finalScoreEl = document.getElementById("finalScore");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var submitScoreBtn = document.getElementById("submitScore");
var endGameBtns = document.getElementById("endGameBtns");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highscoreHeader = document.getElementById("highscore-header");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// quiz questions object
var quizQuestions = [
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Desktop Oriented Mode",
    choiceD: "Digital Ordinance Model",
    answer: "a",
  },
  {
    question: "Arrays in Javascript can be used to store:",
    choiceA: "booleans",
    choiceB: "strings",
    choiceC: "numbers",
    choiceD: "alerts",
    answer: "b",
  },
  {
    question: "What does HTML stand for?",
    choiceA: "Hypertext Medium Language",
    choiceB: "Hypertext Markup Lingo",
    choiceC: "Hippo Tries Making Licorice",
    choiceD: "Hypertext Markup Language",
    answer: "d",
  },
  {
    question: "Name an element that doesn't have a closing tag",
    choiceA: "<img>",
    choiceB: "<body>",
    choiceC: "<head>",
    choiceD: "<p>",
    answer: "a",
  },
  {
    question: "Inside which HTML element do we put the Javascript?",
    choiceA: "<js>",
    choiceB: "<javascript>",
    choiceC: "<script>",
    choiceD: "<scripting>",
    answer: "c",
  },
];

// timer
var secondsLeft = 75;
var timerInterval;
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;

var score = 0;
var correct;

// start quiz and start timer function
function startQuiz() {
  generateQuestions();
  quizBody.classList.remove("hidden");
  startBtn.classList.add("hidden");
  startHeader.classList.add("hidden");
  questionsEl.style.backgroundColor = "blue";
  questionsEl.style.color = "aquamarine";
  questionsEl.style.borderRadius = "1em";
  questionsEl.style.padding = "1em";

    timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

    if (secondsLeft >= 0) {
      span = document.getElementById("timer");
      span.innerHTML = secondsLeft;
    }
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
}

function generateQuestions() {
  if (currentQuestionIndex === finalQuestionIndex) {
    showScore();
    return;
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerText = currentQuestion.question;
  buttonA.innerText = currentQuestion.choiceA;
  buttonB.innerText = currentQuestion.choiceB;
  buttonC.innerText = currentQuestion.choiceC;
  buttonD.innerText = currentQuestion.choiceD;
}

function showScore() {
  console.log("showScore");
  quizBody.classList.add("hidden");
  gameoverDiv.classList.remove("hidden");
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " correct!";
    finalScoreEl.style.fontFamily = "Helvetica, sans-serif";
}

// This function checks the response to each answer
function checkAnswer(finalAnswer) {
  correct = quizQuestions[currentQuestionIndex].answer;
  console.log(correct, finalAnswer);
  if (finalAnswer === correct) {
    score++;
  } else {
    secondsLeft = secondsLeft - 10;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < finalQuestionIndex) {
    console.log("more questions");
    generateQuestions();
  } else if (currentQuestionIndex >= finalQuestionIndex) {
    console.log("end of array");
    showScore();
  }
}

// submit score to local storage
submitScoreBtn.addEventListener("click", function highscore(){ 
    highscoreContainer.classList.remove('hidden');
    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return;
    } else {
        var savedhighScores = JSON.parse(localStorage.getItem('savedhighScores')) || [];
        var currentUser = highscoreInputName.value;
        var currentHighScore = {
            name: currentUser,
            score: score
        };
        savedhighScores.push(currentHighScore);
        console.log(currentHighScore);
        localStorage.setItem('savedhighScores', JSON.stringify(savedhighScores));
        generateHighScores();
    }
})

var roundSpan = document.createElement("ul");
var newNameScoreSpan = document.createElement("li");

// generate high scores from local storage
function generateHighScores(){
    var highscores = JSON.parse(localStorage.getItem("savedhighScores")) || [];
    var leaderBoard = document.getElementById('leader-board');
    for (i=0; i<highscores.length; i++) {
        var players = document.createElement("li");
        players.style.listStyle = "none";
        players.style.margin = "1em";
        players.textContent = `${highscores[i].name} ${highscores[i].score}`;
        leaderBoard.appendChild(players);
    }
}
// replay quiz
function replayQuiz () {
    highscoreContainer.classList.add('hidden');
    gameoverDiv.classList.add('hidden');
    startHeader.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    secondsLeft = 75;
    score = 0;
    currentQuestionIndex = 0;
}

// clear storage
function clearScore () {
    var leaderBoard = document.getElementById('leader-board');
    window.localStorage.clear();
    leaderBoard.textContent = "";
}

startBtn.addEventListener("click", startQuiz);
