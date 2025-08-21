//Global Variables
const optionLetters = ["A) ", "B) ", "C) ", "D) "];
let currentQuestionNumber = 1; //Keeps track of which question number the user is on.
let questionNumbers = []; //Keeps track of which questions are available from the questions array.
let currentScore = 0; //Keeps track of the user's current score
let userAnswers = []; //Stores user's answers for scoring
let totalQuestions = 10; //Total number of questions in the quiz
let username = ''; //Stores the username from localStorage

// --- Small helper utilities to make the main flow easier to read ---
function disableNextControl() {
  const nextIcon = document.querySelector(".carousel-control-next-icon"); // Find the next navigation button
  if (!nextIcon) return; // Exit if button doesn't exist
  // Use project-specific class for the carousel next control so label
  // styles aren't mixed up with option label styles.
  nextIcon.classList.add("carousel-next-disabled"); // Add disabled styling for carousel next
  nextIcon.style.pointerEvents = "none"; // Prevent clicking
}

function enableNextControl() {
  const nextIcon = document.querySelector(".carousel-control-next-icon");
  if (!nextIcon) return;
  nextIcon.classList.remove("carousel-next-disabled");
  nextIcon.style.pointerEvents = "auto";
}

function getActiveSlideNumber() {
  const active = document.querySelector(".carousel-item.active"); // Find currently visible slide
  if (!active) return null; // Return null if no active slide found
  const span = active.querySelector("[data-qnum]"); // Find element with question number
  return span ? parseInt(span.getAttribute("data-qnum"), 10) : null; // Extract and return question number
}

function advanceCarousel() {
  const carouselEl = document.getElementById("quizCarousel"); // Get carousel element
  if (!carouselEl || typeof bootstrap === "undefined") return; // Exit if carousel or Bootstrap not available
  const inst = bootstrap.Carousel.getInstance(carouselEl) || new bootstrap.Carousel(carouselEl); // Get or create carousel instance
  inst.next(); // Move to next slide
}

//Wait until page has loaded before firing functions
document.addEventListener("DOMContentLoaded", () => {
  // Get username from localStorage
  username = localStorage.getItem('quizUsername') || 'Guest'; // Retrieve stored username or default to 'Guest'
  
  // Display username in header if element exists
  displayUsername(); // Update header with personalized greeting
  
  startQuiz(); // Initialize and begin the quiz

  // Add event listener for reset button
  const resetButton = document.querySelector('button[type="reset"]'); // Find reset button
  if (resetButton) {
    resetButton.addEventListener("click", resetQuiz); // Attach reset functionality
  }

  const nextIcon = document.querySelector(".carousel-control-next-icon"); // Find next navigation button
  // Problems caused by bootstrap's built-in method of changing active class on carousel.
  // Fixed using AI help.
  if (nextIcon) {
    nextIcon.addEventListener("click", function handleNext(e) { // Add click handler for navigation
      // Only allow advancing if the current question has been answered
      const questionContainer = document.getElementById(`question-${currentQuestionNumber}`); // Get current question container
      const radioButtons = questionContainer ? questionContainer.getElementsByTagName("input") : []; // Get all radio inputs
      const answered = Array.from(radioButtons).some((rb) => rb.checked); // Check if any option is selected
      if (!answered) return; // do nothing if not answered

      const slideNum = getActiveSlideNumber(); // Get current slide number
      if (slideNum === currentQuestionNumber) {
        // Prevent Bootstrap from doing a duplicate advance; we will create
        // the next slide and advance programmatically.
        e.preventDefault(); // Stop default Bootstrap behavior
        e.stopPropagation(); // Prevent event bubbling
        showNextQuestion(); // Handle question advancement manually
        disableNextControl(); // Disable navigation until next question is answered
      }
      // otherwise let Bootstrap proceed normally
    });
    // Initially disable the next icon
    disableNextControl(); // Start with navigation disabled
    // Ensure carousel navigation state stays in sync when the active slide changes
    const carouselEl = document.getElementById("quizCarousel");
    if (carouselEl) {
      carouselEl.addEventListener('slid.bs.carousel', function () {
        const slideNum = getActiveSlideNumber();
        const qContainer = slideNum ? document.getElementById(`question-${slideNum}`) : null;
        // If this slide has been answered, or it is the results slide, enable next.
        const isAnswered = qContainer && qContainer.dataset.answered === 'true';
        const isResults = qContainer && qContainer.querySelector && qContainer.querySelector('#see-results-btn');
        if (isAnswered || isResults) {
          enableNextControl();
        } else {
          disableNextControl();
        }
      });
    }
  }
});

/**
 * Displays the username in the quiz header
 */
function displayUsername() {
  const headerElement = document.querySelector('.quiz-header h1'); // Find main header element
  if (headerElement && username && username !== 'Guest') { // Check if header exists and username is valid
    headerElement.textContent = `Code Quest - Welcome ${username}!`; // Update header with personalized greeting
  }
}

function initialiseQuestionNumbers() {
  for (let i = 0; i < questions.length; i++) { // Loop through all available questions
    questionNumbers.push(i); // Add each question index to tracking array
  }
  questionNumbers = shuffleArray(questionNumbers);
  questionNumbers.splice(totalQuestions);
  console.log(questionNumbers);
}

/**
 * Initialises the first question for the quiz; creating an array to keep track of which questions have already been used.
 */
function startQuiz() {
  //Creates an array of indexes matching up to the number of questions set by the totalQuestions variable.
  initialiseQuestionNumbers();

  // Initialize displays
  updateScoreDisplay(); // Set initial score display
  updateProgressBar(); // Set initial progress bar

  createOptions(); // Generate HTML for first question
  displayQuestion(questionNumbers); // Load and display first question
}

/**
 * Generates the HTML needed for displaying a question within the quiz carousel.
 */
function createOptions() {
  // If this slide already exists (for example when moving back and then forward), don't recreate it
  if (document.getElementById(`question-${currentQuestionNumber}`)) return; // Exit if question already exists

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
  document.getElementsByClassName("carousel-inner")[0].innerHTML += options; // Add new question HTML to carousel
  // Only the very first question should be active immediately. All other questions
  // are created as inactive so Bootstrap's carousel can animate to them when the
  // user clicks the next control.
  if (currentQuestionNumber === 1) { // Check if this is the first question
    const first = document.getElementById(`question-${currentQuestionNumber}`); // Get first question element
    if (first) first.classList.add("active"); // Make first question visible
  }
}

/**
 * Uses the questionNumbers array to generate a random question from the questions array.
 */
function displayQuestion(questionNumbers) {
  const rand = Math.floor(Math.random() * questionNumbers.length); //Generates a random number between 0 and one less than the number of questions left for the user to complete; to be used as an index number.
  const currentQuestion = questions[questionNumbers[rand]]; //Retrieves the corresponding question object from the questions array.
  questionNumbers.splice(rand, 1); //removes this index value from the questionNumbers array, so not to allow the question to appear again.
  
  // Add null check for question text element
  const questionTextElement = document.getElementById(`question-${currentQuestionNumber}-text`);
  if (questionTextElement) {
    questionTextElement.innerText = currentQuestion.question; //Sets the question on the page to the corresponding question from the questions array.
  }
  
  const questionContainer = document.getElementById(`question-${currentQuestionNumber}`); // Get current question container
  const questionOptions = questionContainer.getElementsByTagName("label"); // Get all option labels
  // Shuffle options before displaying
  let shuffledOptions = shuffleArray(currentQuestion.options); // Randomize option order
  //For all options available within the currently selected questions object, set the corresponding option on the page to be a letter and then the option (e.g. "A) Option 1, B) Option 2 ...").
  for (let i = 0; i < currentQuestion.options.length; i++) { // Loop through all options
    questionOptions[i].innerText = optionLetters[i] + shuffledOptions[i]; // Set option text with letter prefix
  }
  // Attach a single click listener to the question container (event delegation).
  // This avoids adding/removing many individual listeners and prevents the need
  // to clone/replace nodes when disabling options.
  questionContainer.addEventListener("click", function (e) { // Add click handler to question container
    // Check if the click was on a label or its parent .quiz-form-check (labelContainer)
    let labelContainer = e.target.closest(".quiz-form-check"); // Find clicked option container
    if (!labelContainer) return; // Exit if click wasn't on an option
    let label = labelContainer.querySelector("label.quiz-form-check-label"); // Get the option label
    if (!label) return; // Exit if label not found
    // Only proceed if the label is not disabled
    if (label.classList.contains("disabled-label")) return; // Exit if option is disabled
    enableExplainResults(); // Enable the explanation button
    disableOptions({ target: label }); // Process the answer selection
  });
}
//Fisher-Yates shuffle to ensure each time a question is loaded, the options are displayed in a different order.
function shuffleArray(unshuffled){
    let shuffled = unshuffled.map(item => item); //To copy values from one array to another, use .map().
    for(i=unshuffled.length-1; i > 0; i--){ // Loop backwards through array
        j = Math.floor(Math.random()*(unshuffled.length-1)); // Generate random index
        shuffled.splice(j, 1, unshuffled[i]); // Replace element at random index
        shuffled.splice(i, 1, unshuffled[j]); // Replace element at current index
        unshuffled = shuffled.map(item => item); // Update source array for next iteration
    }
    return shuffled; // Return randomized array
}

/**
 * Enables the "Explain Results" button and populates the explanation text.
 */
function enableExplainResults() {
  const explainBtn = document.querySelector(`button[data-bs-target='#results${currentQuestionNumber}']`); // Find explanation button
  const explanationElement = document.getElementById(`explanation-${currentQuestionNumber}`);
  
  // Add null checks to prevent runtime errors
  if (!explanationElement || !explanationElement.children.length) {
    console.warn(`Explanation element not found for question ${currentQuestionNumber}`);
    return;
  }
  
  const explainText = explanationElement.children; // Get explanation text elements
  const questionTextElement = document.getElementById(`question-${currentQuestionNumber}-text`);
  
  if (!questionTextElement) {
    console.warn(`Question text element not found for question ${currentQuestionNumber}`);
    return;
  }
  
  const questionIndex = questions.findIndex( // Find question in original array
    (obj) => obj.question === questionTextElement.innerText
  );
  
  if (questionIndex !== -1) {
    explainText[0].innerText = `Correct Answer: ${questions[questionIndex].answer}`; // Set correct answer text
    explainText[1].innerText = questions[questionIndex].explanation; // Set explanation text
  }
  
  if (explainBtn) {
    explainBtn.disabled = false; // Enable the explanation button
  }
}

/**
 * Disables options once a user has chosen an answer so they can no longer interact with the question.
 * @param {*} e
 */
function disableOptions(e) {
  const questionContainer = document.getElementById(`question-${currentQuestionNumber}`); // Get current question container
  // If this question has already been answered, ignore further clicks.
  if (questionContainer && questionContainer.dataset.answered === 'true') return; // Exit if already answered
  const radioButtons = questionContainer.getElementsByTagName("input"); // Get all radio buttons
  const labels = questionContainer.getElementsByTagName("label"); // Get all labels
  // Since the questions are chose at random in a previous function, the current question index can be found by comparing the
  // question on the page with the questions array objects.
  const questionIndex = questions.findIndex( // Find question in original array
    (obj) => obj.question === document.getElementById(`question-${currentQuestionNumber}-text`).innerText
  );
  const label = e.target; // Get clicked label
  const forId = label.getAttribute("for"); //Finds the for attribute for the label which the user has clicked.
  const radio = document.getElementById(forId); //Finds the corresponding radio input.
  radio.checked = true; //Marks the radio button as checked.
  // Disable all other radio buttons.
  for (let i = 0; i < radioButtons.length; i++) { // Loop through all radio buttons
    radioButtons[i].value = labels[i].innerText.slice(3); // Set value to option text (without letter prefix)
    if (radioButtons[i].id === forId) {
  // disable the selected radio so it can't be re-clicked to re-score
  radioButtons[i].disabled = true; // Disable selected radio button
    } else {
      radioButtons[i].disabled = true; // Disable all other radio buttons
    }
  }
  // Disable label interactivity by toggling classes on the existing labels.
  // Using classes (and tabindex) prevents clicks while keeping the same DOM nodes
  // so we can directly modify them (no need to clone/replace nodes).
  for (let lbl of labels) { // Loop through all labels
    if (lbl.getAttribute("for") === forId) { // Check if this is the selected label
      lbl.classList.remove("disabled-label"); // Keep selected label enabled visually
      lbl.removeAttribute("tabindex"); // Remove tab navigation restriction
    } else {
      lbl.classList.add("disabled-label"); // Disable other labels visually
      lbl.setAttribute("tabindex", "-1"); // Remove from tab navigation
    }
  }
  const currentQuestion = questions[questionIndex]; // Get question object
  // Mark this slide answered to prevent double-click scoring, then pass
  // the clicked label (live DOM node) to checkAnswer.
  if (questionContainer) questionContainer.dataset.answered = 'true'; // Mark question as answered
  checkAnswer(currentQuestion, radio.value, label); // Process the answer
}

function checkAnswer(questionObject, selectedAnswer, selectedLabel) {
  console.log(questionObject.answer, selectedAnswer); // Log correct and selected answers for debugging
  if (selectedAnswer === questionObject.answer) { // Check if answer is correct
    currentScore++; // Increment score for correct answer
    console.log(selectedLabel); // Log selected label for debugging
    selectedLabel.parentElement.classList.add("correct-answer"); // Add correct answer styling
  } else {
    selectedLabel.parentElement.classList.add("incorrect-answer"); // Add incorrect answer styling
  }
  userAnswers.push({ // Store answer details for results page
    question: questionObject.question,
    selectedAnswer: selectedAnswer,
    correctAnswer: questionObject.answer,
    isCorrect: selectedAnswer === questionObject.answer,
  });
  updateScoreDisplay(); // Refresh score display
  updateProgressBar(); // Update progress indicator
  // Do NOT call showNextQuestion here; wait for user to click next icon
  // Instead, enable the next icon if it was disabled
  // Instead, enable the carousel next control using the helper so we
  // consistently toggle the project-specific class and pointer events.
  enableNextControl();
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
  console.log(currentQuestionNumber, questionNumbers, `Score: ${currentScore}`); // Display current quiz state
  // Check if there are still questions left to show
  if (Array.isArray(questionNumbers) && questionNumbers.length !== 0) { // Verify questions remain
    // Move to the next question
    currentQuestionNumber++; // Increment question counter
    // If there are still questions left, render the next one and advance
    if (questionNumbers.length !== 0) { // Check if more questions exist
      createOptions(); // Create the answer options for the next question
      displayQuestion(questionNumbers); // Fill in option text
      // Advance carousel to the newly created slide
      advanceCarousel(); // Move to next slide
    } else {
      // No more questions left: quiz is finished
      console.log("Quiz completed! Final score:", currentScore); // Log completion
      resultsButton(); // Create results slide
      advanceCarousel(); // Move to results slide
    }
  } else {
    // No questions left: quiz is finished
    console.log("Quiz completed! Final score:", currentScore); // Log completion
    resultsButton(); // Create results slide
    advanceCarousel(); // Move to results slide
  }
}

function resultsButton() {
  // Store quiz results in localStorage for results page
  const quizResults = { // Create results object
    username: username,
    score: currentScore,
    totalQuestions: totalQuestions,
    percentage: Math.round((currentScore / totalQuestions) * 100),
    userAnswers: userAnswers
  };
  localStorage.setItem('quizResults', JSON.stringify(quizResults)); // Save results to browser storage

  // Create a results slide whose content is vertically and horizontally centered.
  // Use flex utilities and a minimum height so there's generous spacing above and below.
  let options = `
  <!-- Results ${currentQuestionNumber} -->
  <div id="question-${currentQuestionNumber}" class="carousel-item">
    <div class="card-body d-flex flex-column justify-content-center align-items-center py-5" style="min-height:55vh;">
      <h3 class="text-center mb-4 text-primary">Quiz Complete!</h3>
      <p class="text-center mb-4">Great job ${username}! You scored ${currentScore}/${totalQuestions} (${Math.round((currentScore / totalQuestions) * 100)}%)</p>
      <a id="see-results-btn" class="btn btn-primary btn-lg" href='results.html'>See Detailed Results!</a>
    </div>
  </div>
  `;
  document.getElementsByClassName("carousel-inner")[0].innerHTML += options; // Add results slide to carousel
}

/**
 * Updates the score badge display
 */
function updateScoreDisplay() {
  const scoreElement = document.getElementById("currentScore"); // Find score display element
  const totalElement = document.getElementById("totalQuestions"); // Find total questions display element

  if (scoreElement) {
    scoreElement.textContent = currentScore; // Update current score
  }
  if (totalElement) {
    totalElement.textContent = totalQuestions; // Update total questions
  }
}

/**
 * Updates the progress bar based on questions answered
 */
function updateProgressBar() {
  const progressBar = document.querySelector("#quizProgress .progress-bar"); // Find progress bar element
  const progressContainer = document.getElementById("quizProgress"); // Find progress container

  if (progressBar && progressContainer) {
    // Calculate progress percentage based on questions answered
    const questionsAnswered = userAnswers.length; // Count answered questions
    const progressPercentage = (questionsAnswered / totalQuestions) * 100; // Calculate percentage

    // Update progress bar
    progressBar.style.width = `${progressPercentage}%`; // Set visual width
    progressContainer.setAttribute("aria-valuenow", progressPercentage); // Update accessibility attribute

    // Add smooth transition if not already present
    if (!progressBar.style.transition) {
      progressBar.style.transition = "width 0.5s ease-in-out"; // Add smooth animation
    }
  }
}

/**
 * Resets the quiz to its initial state
 */
function resetQuiz(event) {
  // Prevent form submission
  if (event) {
    event.preventDefault(); // Stop default form behavior
  }

  // Reset all global variables
  currentQuestionNumber = 1; // Reset to first question
  questionNumbers = []; // Clear question tracking array
  currentScore = 0; // Reset score to zero
  userAnswers = []; // Clear answer history

  // Clear the carousel
  const carouselInner = document.querySelector(".carousel-inner"); // Find carousel container
  if (carouselInner) {
    carouselInner.innerHTML = ""; // Remove all slides
  }

  // Clear any form selections
  const quizForm = document.getElementById("quizForm"); // Find quiz form
  if (quizForm) {
    quizForm.reset(); // Reset form inputs
  }

  // Restart the quiz
  startQuiz(); // Initialize new quiz session

  console.log("Quiz has been reset"); // Log reset action
}

/* Instructions Section JavaScript Functionality - Condensed */

// Instructions Features - Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeInstructionsFeatures(); // Set up instructions functionality
});

/**
 * Initialize all interactive features for the instructions section
 * Sets up smooth scrolling, hover effects, and user interactions
 */
function initializeInstructionsFeatures() {
  setupSmoothScrolling(); // Configure smooth scroll to quiz section
  setupHoverEffects();    // Add interactive hover animations
  setupClickTracking();   // Track user interactions for analytics
  setupNavbarInstructionsLink(); // Handle navbar instructions button clicks
  showInstructionsIfTargeted(); // Show instructions if URL contains #instructions
}

/**
 * Configure smooth scrolling from instructions to quiz section
 * Handles the "Start Quiz Now" button click with fade animations
 */
function setupSmoothScrolling() {
  const scrollBtn = document.querySelector('.scroll-to-quiz'); // Find "Start Quiz Now" button
  if (!scrollBtn) return; // Exit if button doesn't exist
  
  scrollBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    
    const instructions = document.getElementById('instructions'); // Get instructions section
    const quizContainer = document.getElementById('quiz-container'); // Get quiz section
    
    if (instructions && quizContainer) {
      // Fade out instructions with smooth animation
      instructions.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      instructions.style.opacity = '0'; // Make transparent
      instructions.style.transform = 'translateY(-20px)'; // Slide up slightly
      
      // After fade completes, hide instructions and show quiz
      setTimeout(() => {
        instructions.style.display = 'none'; // Hide instructions completely
        instructions.style.visibility = 'hidden'; // Remove from accessibility tree
        quizContainer.style.display = 'block'; // Show quiz section
        quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smooth scroll to quiz
      }, 500); // Wait for fade animation to complete
    }
  });
}

/**
 * Add hover effects to instruction and tip cards
 * Creates subtle lift and scale animations on mouse interaction
 */
function setupHoverEffects() {
  // Instruction cards - lift and scale effect
  document.querySelectorAll('.instruction-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.02)';
      card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Tip cards - lift and rotate effect
  document.querySelectorAll('.tip-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px) rotate(1deg)';
      card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotate(0deg)';
    });
  });
}

/**
 * Track user interactions with instructions for analytics
 * Logs clicks on cards and buttons for usage analysis
 */
function setupClickTracking() {
  // Track instruction card clicks
  document.querySelectorAll('.instruction-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      console.log(`Instruction card ${index + 1} clicked`);
    });
  });
  
  // Track tip card clicks  
  document.querySelectorAll('.tip-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      console.log(`Tip card ${index + 1} clicked`);
    });
  });
}

/**
 * Setup navbar instructions link to toggle instructions visibility
 * Handles the navbar "Instructions" button click to show/hide instructions overlay
 */
function setupNavbarInstructionsLink() {
  const instructionsLink = document.querySelector('a[href="#instructions"]'); // Find navbar instructions link
  if (!instructionsLink) return; // Exit if link doesn't exist
  
  instructionsLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    toggleInstructions(); // Show or hide instructions overlay
  });
}

/**
 * Show instructions with animation if URL contains #instructions hash
 * Provides direct linking to instructions section
 */
function showInstructionsIfTargeted() {
  if (window.location.hash === '#instructions') {
    const instructions = document.getElementById('instructions');
    if (instructions) {
      instructions.style.display = 'block';
      instructions.style.opacity = '1';
      instructions.scrollIntoView({ behavior: 'smooth' });
      
      // Add entrance animation
      instructions.style.transform = 'translateY(20px)';
      instructions.style.transition = 'transform 0.6s ease';
      setTimeout(() => instructions.style.transform = 'translateY(0)', 100);
    }
  }
}

/**
 * Toggle instructions section visibility with smooth animations
 * Can be called externally to show/hide instructions programmatically
 */
function toggleInstructions() {
  const instructions = document.getElementById('instructions'); // Get instructions section
  const quizContainer = document.getElementById('quiz-container'); // Get quiz section
  if (!instructions) return; // Exit if instructions don't exist
  
  // Check if instructions are currently visible (accounting for empty display value)
  const isVisible = instructions.style.display !== 'none' && instructions.style.display !== '';
  
  if (isVisible) {
    // Hide instructions with fade out animation
    instructions.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    instructions.style.opacity = '0'; // Make transparent
    instructions.style.transform = 'translateY(-20px)'; // Slide up slightly
    setTimeout(() => {
      instructions.style.display = 'none'; // Hide completely
      instructions.style.visibility = 'hidden'; // Remove from accessibility tree
      // Show quiz container when instructions are hidden
      if (quizContainer) {
        quizContainer.style.display = 'block'; // Make quiz visible
      }
    }, 500); // Wait for fade animation
  } else {
    // Show instructions with fade in animation
    instructions.style.display = 'block'; // Make visible in layout
    instructions.style.visibility = 'visible'; // Make accessible to screen readers
    instructions.style.opacity = '0'; // Start transparent
    instructions.style.transform = 'translateY(20px)'; // Start slightly below
    instructions.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Hide quiz container when instructions are shown
    if (quizContainer) {
      quizContainer.style.display = 'none'; // Hide quiz section
    }
    
    // Scroll to instructions and animate in
    instructions.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smooth scroll to top
    setTimeout(() => {
      instructions.style.opacity = '1'; // Fade in
      instructions.style.transform = 'translateY(0)'; // Slide into final position
    }, 50); // Small delay for smooth effect
  }
}

/**
 * Check if username is set before starting quiz
 * Prompts user to enter username for leaderboard functionality
 */
function checkUsernameBeforeQuiz() {
  const username = localStorage.getItem('quizUsername');
  if (!username || username === 'Guest') {
    alert('💡 Pro tip: Enter your username on the home page to save your score!');
    return false;
  }
  return true;
}

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleInstructions,
    checkUsernameBeforeQuiz,
    initializeInstructionsFeatures
  };
}
