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
let score = 0;

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
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestionNumber}" id="q${currentQuestionNumber}a" style="opacity: 0;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestionNumber}a"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestionNumber}" id="q${currentQuestionNumber}b" style="opacity: 0;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestionNumber}b"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestionNumber}" id="q${currentQuestionNumber}c" style="opacity: 0;">
        <label class="form-check-label quiz-form-check-label" for="q${currentQuestionNumber}c"></label>
      </div>
      <div class="quiz-form-check">
        <input class="form-check-input quiz-form-check-input" type="radio" name="question${currentQuestionNumber}" id="q${currentQuestionNumber}d" style="opacity: 0;">
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
    questionOptions[i].innerText = optionLetters[i] + currentQuestion.options[i];
  }
  //Give all options on the page an event handler to allow for further testing on adding new questions.
  for (let i = 0; i < currentQuestion.options.length; i++) {
    questionOptions[i].addEventListener("click", disableOptions);
  }
}

/**
 * Disables options once a user has chosen an answer so they can no longer interact with the question.
 * @param {*} e 
 */
function disableOptions(e) {
  const questionContainer = document.getElementById(`question-${currentQuestionNumber}`);
  const radioButtons = questionContainer.getElementsByTagName("input");
  const labels = questionContainer.getElementsByTagName("label");

  // Gets the label that was clicked and check the corresponding button.
  const label = e.target;
  const forId = label.getAttribute('for'); //Finds the for attribute for the label.
  if (forId) {
    const radio = document.getElementById(forId); //Finds the corresponding radio button
    radio.checked = true; //Marks corresponding radio as checked.
  }
  // Disables all radios except the checked one
  for (let button of radioButtons) {
    if (button.id === forId) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }
  // Removes all label event listeners and block focus except for the selected label
  //AI helped with this block.
  for (let lbl of labels) {
    // Clone node to remove all event listeners
    const newLbl = lbl.cloneNode(true);
    if (lbl.getAttribute('for') === forId) {
      newLbl.classList.remove('disabled-label');
      newLbl.removeAttribute('tabindex');
    } else {
      newLbl.classList.add('disabled-label');
      newLbl.setAttribute('tabindex', '-1');
      newLbl.blur && newLbl.blur();
    }
    lbl.parentNode.replaceChild(newLbl, lbl);
  }
  checkAnswer();
}

/**
 * Checks the user's answer with the correct answer and increments the score if correct.
 */
function checkAnswer() {
  
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
