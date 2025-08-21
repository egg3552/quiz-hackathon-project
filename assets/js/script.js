// Main script for index.html - Username functionality
document.addEventListener('DOMContentLoaded', function() {
    const usernameForm = document.querySelector('.form-inline'); // Find username form
    const usernameInput = document.getElementById('inputPassword2'); // Find username input field
    const startQuizButton = document.querySelector('.btn-start-quiz'); // Find start quiz button

    // Handle username form submission
    if (usernameForm) {
        usernameForm.addEventListener('submit', function(event) { // Add form submit handler
            event.preventDefault(); // Prevent default form submission
            
            const username = usernameInput.value.trim(); // Get and clean username input
            
            if (username === '') { // Check if username is empty
                alert('Please enter a username before starting the quiz!'); // Show error message
                return; // Exit if no username
            }
            
            // Store username in localStorage
            localStorage.setItem('quizUsername', username); // Save username to browser storage
            
            // Redirect to quiz page
            window.location.href = 'quiz.html'; // Navigate to quiz
        });
    }

    // Modify Start Quiz button to check for username
    if (startQuizButton) {
        startQuizButton.addEventListener('click', function(event) { // Add button click handler
            event.preventDefault(); // Prevent default link behavior
            
            const username = usernameInput ? usernameInput.value.trim() : ''; // Get username if input exists
            
            if (username === '') { // Check if username is empty
                alert('Please enter a username before starting the quiz!'); // Show error message
                usernameInput.focus(); // Focus on input field
                return; // Exit if no username
            }
            
            // Store username in localStorage
            localStorage.setItem('quizUsername', username); // Save username to browser storage
            
            // Redirect to quiz page
            window.location.href = 'quiz.html'; // Navigate to quiz
        });
    }

    // Load existing username if returning to homepage
    const savedUsername = localStorage.getItem('quizUsername'); // Retrieve saved username
    if (savedUsername && usernameInput) { // Check if username exists and input field exists
        usernameInput.value = savedUsername; // Pre-fill input with saved username
    }
});
