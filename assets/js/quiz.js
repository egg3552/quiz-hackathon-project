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
let currentQuestion = 1; //Keeps track of which question number the user is on.
let questionNumbers = []; //Keeps track of which questions are available from the questions array.

//Wait until page has loaded before firing functions
document.addEventListener("DOMContentLoaded", () => {
  startQuiz();
});

/**
 * Initialises the first question for the quiz; creating an array to keep track of which questions have already been used.
 */
function startQuiz() {
  //Creates an array of indexes matching up to the number of questions available in the questions array.
  for (let i = 0; i < questions.length; i++) {
    questionNumbers.push(i);
  }
  createOptions();
  displayQuestion(questionNumbers);
}

/**
 * Generates the HTML needed for displaying a question within the quiz carousel.
 */
function createOptions() {
  let options = `
  <!-- Question ${currentQuestion} -->
  <div id="question-${currentQuestion}" class="carousel-item active">
    <div class="card-body text-start">
      <h4 class="quiz-question-title text-center">Question ${currentQuestion}</h4>
      <p id="question-${currentQuestion}-text" class="quiz-question-text text-center"></p>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestion}" id="q${currentQuestion}a" style="display: none;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestion}a"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestion}" id="q${currentQuestion}b" style="display: none;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestion}b"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestion}" id="q${currentQuestion}c" style="display: none;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestion}c"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestion}" id="q${currentQuestion}d" style="display: none;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestion}d"></label>
      </div>
    </div>
  </div>
  `;
  document.getElementsByClassName("carousel-inner")[0].innerHTML += options;
}

/**
 * Uses the questionNumbers array to generate a random question from the questions array.
 */
function displayQuestion(questionNumbers) {}

/**
 * Currently used for debugging.
 * Generates more questions when called.
 */
function nextQuestion() {}
