// Questions added as an object array
const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "color", "font-color", "text-style"],
    answer: "color"
  },
  {
    question: "Which JavaScript method is used to select an element by its ID?",
    options: ["getElementById()", "getElementsByClassName()", "selectElement()", "querySelector()"],
    answer: "getElementById()"
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
  for (let i = 0; i < questions.length; i++){
    questionNumbers.push(i);
  }
  createOptions();
  displayQuestion(questionNumbers);  
}

/**
 * Generates the HTML needed for displaying a question within the quiz carousel.
 */
function createOptions() {
  
}

/**
 * Uses the questionNumbers array to generate a random question from the questions array.
 */
function displayQuestion(questionNumbers) {

}

/**
 * Currently used for debugging.
 * Generates more questions when called.
 */
function nextQuestion() {

}