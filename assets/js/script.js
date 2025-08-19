// Main script for index.html - Username functionality
document.addEventListener('DOMContentLoaded', function() {
    const usernameForm = document.querySelector('.form-inline');
    const usernameInput = document.getElementById('inputPassword2');
    const startQuizButton = document.querySelector('.btn-start-quiz');

    // Handle username form submission
    if (usernameForm) {
        usernameForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = usernameInput.value.trim();
            
            if (username === '') {
                alert('Please enter a username before starting the quiz!');
                return;
            }
            
            // Store username in localStorage
            localStorage.setItem('quizUsername', username);
            
            // Redirect to quiz page
            window.location.href = 'quiz.html';
        });
    }

    // Modify Start Quiz button to check for username
    if (startQuizButton) {
        startQuizButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            const username = usernameInput ? usernameInput.value.trim() : '';
            
            if (username === '') {
                alert('Please enter a username before starting the quiz!');
                usernameInput.focus();
                return;
            }
            
            // Store username in localStorage
            localStorage.setItem('quizUsername', username);
            
            // Redirect to quiz page
            window.location.href = 'quiz.html';
        });
    }

    // Load existing username if returning to homepage
    const savedUsername = localStorage.getItem('quizUsername');
    if (savedUsername && usernameInput) {
        usernameInput.value = savedUsername;
    }
});
