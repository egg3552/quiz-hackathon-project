// Instructions Features - Condensed and commented code for interactive instructions
document.addEventListener('DOMContentLoaded', function() {
  initializeInstructionsFeatures(); // Initialize all instructions functionality on page load
});

/**
 * Initialize all interactive features for the instructions section
 * Sets up smooth scrolling, hover effects, and user interactions
 */
function initializeInstructionsFeatures() {
  setupSmoothScrolling(); // Configure smooth scroll to quiz section
  setupHoverEffects();    // Add interactive hover animations
  setupClickTracking();   // Track user interactions for analytics
  showInstructionsIfTargeted(); // Show instructions if URL contains #instructions
}

/**
 * Configure smooth scrolling from instructions to quiz section
 * Handles the "Start Quiz Now" button click with fade animations
 */
function setupSmoothScrolling() {
  const scrollBtn = document.querySelector('.scroll-to-quiz');
  if (!scrollBtn) return;
  
  scrollBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const instructions = document.getElementById('instructions');
    const quizContainer = document.getElementById('quiz-container');
    
    if (instructions && quizContainer) {
      // Fade out instructions with smooth animation
      instructions.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      instructions.style.opacity = '0';
      instructions.style.transform = 'translateY(-20px)';
      
      // After fade completes, scroll to quiz and show it
      setTimeout(() => {
        quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        instructions.style.display = 'none';
        quizContainer.style.opacity = '1';
      }, 500);
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
  const instructions = document.getElementById('instructions');
  if (!instructions) return;
  
  const isVisible = instructions.style.display !== 'none';
  
  if (isVisible) {
    // Hide with fade out animation
    instructions.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    instructions.style.opacity = '0';
    instructions.style.transform = 'translateY(-20px)';
    setTimeout(() => instructions.style.display = 'none', 500);
  } else {
    // Show with fade in animation
    instructions.style.display = 'block';
    instructions.style.opacity = '0';
    instructions.style.transform = 'translateY(20px)';
    instructions.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      instructions.style.opacity = '1';
      instructions.style.transform = 'translateY(0)';
    }, 50);
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
