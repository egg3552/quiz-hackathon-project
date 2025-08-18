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
  const currentQuestion = questions[rand]; //Retrieves the corresponding question object from the questions array.
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
    questionOptions[i].addEventListener("click", nextQuestion);
  }
}

/**
 * Currently used for debugging.
 * Generates more questions when called.
 */
function nextQuestion() {
  console.log(currentQuestionNumber, questionNumbers);
  if (questionNumbers.length !== 0) {
    document.getElementById(`question-${currentQuestionNumber}`).classList.remove("active");
    currentQuestionNumber++;
    createOptions();
    displayQuestion(questionNumbers);
  } else {
    console.log("No more questions");
  }  
}
