// Questions added as an object array
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "color", "font-color", "text-style"],
    answer: "color",
  },
  {
    question: "Which JavaScript method is used to select an element by its ID?",
    options: ["getElementById()", "getElementsByClassName()", "selectElement()", "querySelector()"],
    answer: "getElementById()",
  },
];

//Global Variables
const optionLetters = ["A) ", "B) ", "C) ", "D) "];
let currentQuestionNumber = 1; //Keeps track of which question number the user is on.
let questionNumbers = []; //Keeps track of which questions are available from the questions array.
let currentScore = 0; //Keeps track of the user's current score
let userAnswers = []; //Stores user's answers for scoring
let totalQuestions = 0; //Total number of questions in the quiz

//Wait until page has loaded before firing functions
document.addEventListener("DOMContentLoaded", () => {
  startQuiz();
  
  // Add event listener for reset button
  const resetButton = document.querySelector('button[type="reset"]');
  if (resetButton) {
    resetButton.addEventListener('click', resetQuiz);
  }
});

/**
 * Initialises the first question for the quiz; creating an array to keep track of which questions have already been used.
 */
function startQuiz() {
  //Creates an array of indexes matching up to the number of questions available in the questions array.
  for (let i = 0; i < questions.length; i++) {
    questionNumbers.push(i);
  }
  // Set total questions count
  totalQuestions = questions.length;
  
  // Initialize displays
  updateScoreDisplay();
  updateProgressBar();
  
  createOptions();
  displayQuestion(questionNumbers);
}

/**
 * Generates the HTML needed for displaying a question within the quiz carousel.
 */
function createOptions() {
  let options = `
  <!-- Question ${currentQuestionNumber} -->
  <div id="question-${currentQuestionNumber}" class="carousel-item active">
    <div class="card-body text-start">
      <h4 class="quiz-question-title text-center">Question ${currentQuestionNumber}</h4>
      <p id="question-${currentQuestionNumber}-text" class="quiz-question-text text-center"></p>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestionNumber}" id="q${currentQuestionNumber}a" style="display: none;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestionNumber}a"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestionNumber}" id="q${currentQuestionNumber}b" style="display: none;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestionNumber}b"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestionNumber}" id="q${currentQuestionNumber}c" style="display: none;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestionNumber}c"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestionNumber}" id="q${currentQuestionNumber}d" style="display: none;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestionNumber}d"></label>
      </div>
    </div>
  </div>
  `;
  document.getElementsByClassName("carousel-inner")[0].innerHTML += options;
}

/**
 * Uses the questionNumbers array to generate a random question from the questions array.
 */
function displayQuestion(questionNumbers) {
  const rand = Math.floor(Math.random() * questionNumbers.length); //Generates a random number between 0 and one less than the number of questions left for the user to complete; to be used as an index number.
  const currentQuestion = questions[questionNumbers[rand]]; //Retrieves the corresponding question object from the questions array.
  questionNumbers.splice(rand, 1); //removes this index value from the questionNumbers array, so not to allow the question to appear again.
  document.getElementById(`question-${currentQuestionNumber}-text`).innerText = currentQuestion.question; //Sets the question on the page to the corresponding question from the questions array.
  const questionContainer = document.getElementById(`question-${currentQuestionNumber}`); 
  const questionOptions = questionContainer.getElementsByTagName("label");
  //For all options available within the currently selected questions object, set the corresponding option on the page to be a letter and then the option (e.g. "A) Option 1, B) Option 2 ...").
  for (let i = 0; i < currentQuestion.options.length; i++) {
    questionOptions[i].innerText = currentQuestion.options[i];
  }
  //Give all options on the page an event handler to allow for further testing on adding new questions.
  for (let i = 0; i < currentQuestion.options.length; i++) {
    questionOptions[i].addEventListener("click", function() {
      nextQuestion(currentQuestion, this.innerText);
    });
  }
}

/**
 * Processes the user's answer and generates more questions when called.
 */
function nextQuestion(questionObject, selectedAnswer) {
  // Check if the answer is correct and update score
  if (selectedAnswer === questionObject.answer) {
    currentScore++;
  }
  
  // Store the user's answer
  userAnswers.push({
    question: questionObject.question,
    selectedAnswer: selectedAnswer,
    correctAnswer: questionObject.answer,
    isCorrect: selectedAnswer === questionObject.answer
  });
  
  // Update displays
  updateScoreDisplay();
  updateProgressBar();
  
  console.log(currentQuestionNumber, questionNumbers, `Score: ${currentScore}`);
  
  if (questionNumbers.length !== 0) {
    document.getElementById(`question-${currentQuestionNumber}`).classList.remove("active");
    currentQuestionNumber++;
    createOptions();
    displayQuestion(questionNumbers);
  } else {
    console.log("Quiz completed! Final score:", currentScore);
    // Quiz is finished - could add completion logic here
  }  
}

/**
 * Updates the score badge display
 */
function updateScoreDisplay() {
  const scoreElement = document.getElementById('currentScore');
  const totalElement = document.getElementById('totalQuestions');
  
  if (scoreElement) {
    scoreElement.textContent = currentScore;
  }
  if (totalElement) {
    totalElement.textContent = totalQuestions;
  }
}

/**
 * Updates the progress bar based on questions answered
 */
function updateProgressBar() {
  const progressBar = document.querySelector('#quizProgress .progress-bar');
  const progressContainer = document.getElementById('quizProgress');
  
  if (progressBar && progressContainer) {
    // Calculate progress percentage based on questions answered
    const questionsAnswered = userAnswers.length;
    const progressPercentage = (questionsAnswered / totalQuestions) * 100;
    
    // Update progress bar
    progressBar.style.width = `${progressPercentage}%`;
    progressContainer.setAttribute('aria-valuenow', progressPercentage);
    
    // Add smooth transition if not already present
    if (!progressBar.style.transition) {
      progressBar.style.transition = 'width 0.5s ease-in-out';
    }
  }
}

/**
 * Resets the quiz to its initial state
 */
function resetQuiz(event) {
  // Prevent form submission
  if (event) {
    event.preventDefault();
  }
  
  // Reset all global variables
  currentQuestionNumber = 1;
  questionNumbers = [];
  currentScore = 0;
  userAnswers = [];
  totalQuestions = 0;
  
  // Clear the carousel
  const carouselInner = document.querySelector('.carousel-inner');
  if (carouselInner) {
    carouselInner.innerHTML = '';
  }
  
  // Clear any form selections
  const quizForm = document.getElementById('quizForm');
  if (quizForm) {
    quizForm.reset();
  }
  
  // Hide results section if visible
  const resultsSection = document.getElementById('collapseExample');
  if (resultsSection && resultsSection.classList.contains('show')) {
    const collapseInstance = bootstrap.Collapse.getInstance(resultsSection);
    if (collapseInstance) {
      collapseInstance.hide();
    }
  }
  
  // Restart the quiz
  startQuiz();
  
  console.log('Quiz has been reset');
}
