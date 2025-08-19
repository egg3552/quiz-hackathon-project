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
    explanation:
      "It's the standard language used to create and structure content on the web. “HyperText” refers to the clickable links that connect web pages, and “Markup Language” means it uses tags to define elements like headings, paragraphs, images, and links. It's not a programming language - it's a structural one.",
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "color", "font-color", "text-style"],
    answer: "color",
    explanation: "The color property specifically targets the foreground text color of an element.",
  },
  {
    question: "Which JavaScript method is used to select an element by its ID?",
    options: ["getElementById()", "getElementsByClassName()", "selectElement()", "querySelector()"],
    answer: "getElementById()",
    explanation: "This method retrieves the first element in the DOM with the specified id attribute. It's fast, direct, and commonly used when you know the exact ID of the element you want to manipulate.",
  },
  {
    question: "What is the purpose of the <meta> tag in HTML?",
    options: [
      "Adds styling rules to the page",
      "Embeds external JavaScript files",
      "Displays content directly to the user",
      "Provides metadata about the HTML document",
    ],
    answer: "Provides metadata about the HTML document",
    explanation: "It's used for things like setting character encoding, defining viewport settings for responsive design, and offering descriptions for SEO. Though invisible to users, it's essential for performance, accessibility, and discoverability.",
  },
];

//Global Variables
const optionLetters = ["A) ", "B) ", "C) ", "D) "];
let currentQuestionNumber = 1; //Keeps track of which question number the user is on.
let questionNumbers = []; //Keeps track of which questions are available from the questions array.
let currentScore = 0; //Keeps track of the user's current score
let userAnswers = []; //Stores user's answers for scoring
let totalQuestions = 0; //Total number of questions in the quiz
let username = ""; //Stores the username from localStorage

// --- Small helper utilities to make the main flow easier to read ---
function disableNextControl() {
  const nextIcon = document.querySelector(".carousel-control-next-icon");
  if (!nextIcon) return;
  nextIcon.classList.add("disabled-label");
  nextIcon.style.pointerEvents = "none";
}

function enableNextControl() {
  const nextIcon = document.querySelector(".carousel-control-next-icon");
  if (!nextIcon) return;
  nextIcon.classList.remove("disabled-label");
  nextIcon.style.pointerEvents = "auto";
}

function getActiveSlideNumber() {
  const active = document.querySelector(".carousel-item.active");
  if (!active) return null;
  const span = active.querySelector("[data-qnum]");
  return span ? parseInt(span.getAttribute("data-qnum"), 10) : null;
}

function advanceCarousel() {
  const carouselEl = document.getElementById("quizCarousel");
  if (!carouselEl || typeof bootstrap === "undefined") return;
  const inst = bootstrap.Carousel.getInstance(carouselEl) || new bootstrap.Carousel(carouselEl);
  inst.next();
}

//Wait until page has loaded before firing functions
document.addEventListener("DOMContentLoaded", () => {
  // Get username from localStorage
  username = localStorage.getItem("quizUsername") || "Guest";

  // Display username in header if element exists
  displayUsername();

  startQuiz();

  // Add event listener for reset button
  const resetButton = document.querySelector('button[type="reset"]');
  if (resetButton) {
    resetButton.addEventListener("click", resetQuiz);
  }

  const nextIcon = document.querySelector(".carousel-control-next-icon");
  // Problems caused by bootstrap's built-in method of changing active class on carousel.
  // Fixed using AI help.
  if (nextIcon) {
    nextIcon.addEventListener("click", function handleNext(evt) {
      // Only allow advancing if the current question has been answered
      const questionContainer = document.getElementById(`question-${currentQuestionNumber}`);
      const radioButtons = questionContainer ? questionContainer.getElementsByTagName("input") : [];
      const answered = Array.from(radioButtons).some((rb) => rb.checked);
      if (!answered) return; // do nothing if not answered

      const slideNum = getActiveSlideNumber();
      if (slideNum === currentQuestionNumber) {
        // Prevent Bootstrap from doing a duplicate advance; we will create
        // the next slide and advance programmatically.
        evt.preventDefault();
        evt.stopPropagation();
        showNextQuestion();
        disableNextControl();
      }
      // otherwise let Bootstrap proceed normally
    });
    // Initially disable the next icon
    disableNextControl();
  }
});

/**
 * Displays the username in the quiz header
 */
function displayUsername() {
  const headerElement = document.querySelector(".quiz-header h1");
  if (headerElement && username && username !== "Guest") {
    headerElement.textContent = `Code Quest - Welcome ${username}!`;
  }
}

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
  // If this slide already exists (for example when moving back and then forward), don't recreate it
  if (document.getElementById(`question-${currentQuestionNumber}`)) return;

  let options = `
  <!-- Question ${currentQuestionNumber} -->
  <div id="question-${currentQuestionNumber}" class="carousel-item">
    <div class="card-body text-start">
      <h4 class="quiz-question-title text-center">Question <span data-qnum="${currentQuestionNumber}">${currentQuestionNumber}</span></h4>
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
    <!-- Results Explained Button -->
      <div class="text-center">
        <button class="btn btn-secondary btn-lg px-4 py-2" type="button" data-bs-toggle="collapse" data-bs-target="#results${currentQuestionNumber}"
          aria-expanded="false" aria-controls="results${currentQuestionNumber}" disabled>
          <i class="fas fa-info-circle me-2"></i>Results Explained
        </button>
      </div>
    <!-- Collapsible Results Section -->
      <div class="collapse mt-3" id="results${currentQuestionNumber}">
        <div id="explanation-${currentQuestionNumber}" class="card card-body">
          <h5 class="text-center mb-3">Answer Explanation</h5>
          <p class="text-center">Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.</p>
        </div>
      </div>
    </div>
  `;
  document.getElementsByClassName("carousel-inner")[0].innerHTML += options;
  // Only the very first question should be active immediately. All other questions
  // are created as inactive so Bootstrap's carousel can animate to them when the
  // user clicks the next control.
  if (currentQuestionNumber === 1) {
    const first = document.getElementById(`question-${currentQuestionNumber}`);
    if (first) first.classList.add("active");
  }
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
  // Shuffle options before displaying
  let shuffledOptions = shuffleArray(currentQuestion.options);
  //For all options available within the currently selected questions object, set the corresponding option on the page to be a letter and then the option (e.g. "A) Option 1, B) Option 2 ...").
  for (let i = 0; i < currentQuestion.options.length; i++) {
    questionOptions[i].innerText = optionLetters[i] + shuffledOptions[i];
  }
  // Attach a single click listener to the question container (event delegation).
  // This avoids adding/removing many individual listeners and prevents the need
  // to clone/replace nodes when disabling options.
  questionContainer.addEventListener("click", function (evt) {
    const label = evt.target.closest("label.quiz-form-check-label");
    if (!label) return; // clicked outside a label
    // Ignore clicks on labels that have been disabled
    if (label.classList.contains("disabled-label")) return;
    // Forward a synthetic event-like object to reuse existing logic
    enableExplainResults();
    disableOptions({ target: label });
  });
}
//Fisher-Yates shuffle to ensure each time a question is loaded, the options are displayed in a different order.
function shuffleArray(unshuffled) {
  let shuffled = unshuffled.map((item) => item); //To copy values from one array to another, use .map().
  for (i = unshuffled.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (unshuffled.length - 1));
    shuffled.splice(j, 1, unshuffled[i]);
    shuffled.splice(i, 1, unshuffled[j]);
    unshuffled = shuffled.map((item) => item);
  }
  return shuffled;
}

/**
 * Enables the "Explain Results" button and populates the explanation text.
 */
function enableExplainResults() {
  const explainBtn = document.querySelector(`button[data-bs-target='#results${currentQuestionNumber}']`);
  const explainText = document.getElementById(`explanation-${currentQuestionNumber}`).children;
  const questionIndex = questions.findIndex(
    (obj) => obj.question === document.getElementById(`question-${currentQuestionNumber}-text`).innerText
  );
  explainText[0].innerText = `Correct Answer: ${questions[questionIndex].answer}`;
  explainText[1].innerText = questions[questionIndex].explanation;
  explainBtn.disabled = false;
}

/**
 * Disables options once a user has chosen an answer so they can no longer interact with the question.
 * @param {*} e
 */
function disableOptions(e) {
  const questionContainer = document.getElementById(`question-${currentQuestionNumber}`);
  const radioButtons = questionContainer.getElementsByTagName("input");
  const labels = questionContainer.getElementsByTagName("label");
  // Since the questions are chose at random in a previous function, the current question index can be found by comparing the
  // question on the page with the questions array objects.
  const questionIndex = questions.findIndex(
    (obj) => obj.question === document.getElementById(`question-${currentQuestionNumber}-text`).innerText
  );
  const label = e.target;
  const forId = label.getAttribute("for"); //Finds the for attribute for the label which the user has clicked.
  const radio = document.getElementById(forId); //Finds the corresponding radio input.
  radio.checked = true; //Marks the radio button as checked.
  // Disable all other radio buttons.
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].value = labels[i].innerText.slice(3);
    if (radioButtons[i].id === forId) {
      radioButtons[i].disabled = false;
    } else {
      radioButtons[i].disabled = true;
    }
  }
  // Disable label interactivity by toggling classes on the existing labels.
  // Using classes (and tabindex) prevents clicks while keeping the same DOM nodes
  // so we can directly modify them (no need to clone/replace nodes).
  for (let lbl of labels) {
    if (lbl.getAttribute("for") === forId) {
      lbl.classList.remove("disabled-label");
      lbl.removeAttribute("tabindex");
    } else {
      lbl.classList.add("disabled-label");
      lbl.setAttribute("tabindex", "-1");
    }
  }
  const currentQuestion = questions[questionIndex];
  // Pass the clicked label (which is the live DOM node) to checkAnswer.
  checkAnswer(currentQuestion, radio.value, label);
}

function checkAnswer(questionObject, selectedAnswer, selectedLabel) {
  console.log(questionObject.answer, selectedAnswer);
  if (selectedAnswer === questionObject.answer) {
    currentScore++;
    console.log(selectedLabel);
    selectedLabel.parentElement.classList.add("correct-answer");
  } else {
    selectedLabel.parentElement.classList.add("incorrect-answer");
  }
  userAnswers.push({
    question: questionObject.question,
    selectedAnswer: selectedAnswer,
    correctAnswer: questionObject.answer,
    isCorrect: selectedAnswer === questionObject.answer,
  });
  updateScoreDisplay();
  updateProgressBar();
  // Do NOT call showNextQuestion here; wait for user to click next icon
  // Instead, enable the next icon if it was disabled
  const nextIcon = document.querySelector(".carousel-control-next-icon");
  if (nextIcon) {
    nextIcon.classList.remove("disabled-label");
    nextIcon.style.pointerEvents = "auto";
  }
}

/**
 * Shows the next question in the quiz
 */
/**
 * Advances the quiz to the next question when the user clicks the next icon.
 * Handles hiding the current question, incrementing the question counter,
 * rendering the next question, or finishing the quiz if there are no more questions.
 */
function showNextQuestion() {
  // Log current state for debugging
  console.log(currentQuestionNumber, questionNumbers, `Score: ${currentScore}`);
  // Check if there are still questions left to show
  if (Array.isArray(questionNumbers) && questionNumbers.length !== 0) {
    // Move to the next question
    currentQuestionNumber++;
    // If there are still questions left, render the next one and advance
    if (questionNumbers.length !== 0) {
      createOptions(); // Create the answer options for the next question
      displayQuestion(questionNumbers); // Fill in option text
      // Advance carousel to the newly created slide
      advanceCarousel();
    } else {
      // No more questions left: quiz is finished
      console.log("Quiz completed! Final score:", currentScore);
      resultsButton();
      advanceCarousel();
    }
  } else {
    // No questions left: quiz is finished
    console.log("Quiz completed! Final score:", currentScore);
    resultsButton();
    advanceCarousel();
  }
}

function resultsButton() {
  // Store quiz results in localStorage for results page
  const quizResults = {
    username: username,
    score: currentScore,
    totalQuestions: totalQuestions,
    percentage: Math.round((currentScore / totalQuestions) * 100),
    userAnswers: userAnswers,
  };
  localStorage.setItem("quizResults", JSON.stringify(quizResults));

  // Create a results slide whose content is vertically and horizontally centered.
  // Use flex utilities and a minimum height so there's generous spacing above and below.
  let options = `
  <!-- Results ${currentQuestionNumber} -->
  <div id="question-${currentQuestionNumber}" class="carousel-item">
    <div class="card-body d-flex flex-column justify-content-center align-items-center py-5" style="min-height:55vh;">
      <h3 class="text-center mb-4 text-primary">Quiz Complete!</h3>
      <p class="text-center mb-4">Great job ${username}! You scored ${currentScore}/${totalQuestions} (${Math.round(
    (currentScore / totalQuestions) * 100
  )}%)</p>
      <a id="see-results-btn" class="btn btn-primary btn-lg" href='results.html'>See Detailed Results!</a>
    </div>
  </div>
  `;
  document.getElementsByClassName("carousel-inner")[0].innerHTML += options;
}

/**
 * Updates the score badge display
 */
function updateScoreDisplay() {
  const scoreElement = document.getElementById("currentScore");
  const totalElement = document.getElementById("totalQuestions");

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
  const progressBar = document.querySelector("#quizProgress .progress-bar");
  const progressContainer = document.getElementById("quizProgress");

  if (progressBar && progressContainer) {
    // Calculate progress percentage based on questions answered
    const questionsAnswered = userAnswers.length;
    const progressPercentage = (questionsAnswered / totalQuestions) * 100;

    // Update progress bar
    progressBar.style.width = `${progressPercentage}%`;
    progressContainer.setAttribute("aria-valuenow", progressPercentage);

    // Add smooth transition if not already present
    if (!progressBar.style.transition) {
      progressBar.style.transition = "width 0.5s ease-in-out";
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
  const carouselInner = document.querySelector(".carousel-inner");
  if (carouselInner) {
    carouselInner.innerHTML = "";
  }

  // Clear any form selections
  const quizForm = document.getElementById("quizForm");
  if (quizForm) {
    quizForm.reset();
  }

  // Restart the quiz
  startQuiz();

  console.log("Quiz has been reset");
}
