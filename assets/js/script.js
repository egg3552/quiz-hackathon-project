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
let container = document.getElementById("quizCarousel");
let userOptions = container.getElementsByTagName("label");
let questionNumber = 1;
let questionNumbers = [];