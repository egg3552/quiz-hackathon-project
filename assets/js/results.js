// Results page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get quiz results from localStorage
    const quizResultsData = localStorage.getItem('quizResults');
    
    if (!quizResultsData) {
        // No results found, redirect to home
        window.location.href = 'index.html';
        return;
    }
    
    const results = JSON.parse(quizResultsData);
    
    // Save score to leaderboard if not already saved
    if (!results.savedToLeaderboard) {
        saveToLeaderboard(results);
        
        // Mark as saved to prevent duplicate entries
        results.savedToLeaderboard = true;
        localStorage.setItem('quizResults', JSON.stringify(results));
    }
    
    // Update the results display
    updateResultsDisplay(results);
});

/**
 * Saves the quiz results to the leaderboard
 */
function saveToLeaderboard(results) {
    const scores = getLeaderboardScores();
    const newScore = {
        username: results.username || 'Anonymous',
        score: results.score,
        totalQuestions: results.totalQuestions,
        percentage: results.percentage,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };
    
    scores.push(newScore);
    
    // Sort by percentage (highest first), then by timestamp (newest first)
    scores.sort((a, b) => {
        if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
        }
        return b.timestamp - a.timestamp;
    });
    
    // Keep only top 10 scores
    const topScores = scores.slice(0, 10);
    
    localStorage.setItem('quizLeaderboard', JSON.stringify(topScores));
}

/**
 * Gets leaderboard scores from localStorage
 */
function getLeaderboardScores() {
    const scores = localStorage.getItem('quizLeaderboard');
    return scores ? JSON.parse(scores) : [];
}

function updateResultsDisplay(results) {
    const titleElement = document.getElementById('results-title');
    const scoreBadge = document.getElementById('score-badge');
    const messageElement = document.getElementById('results-message');
    
    // Update title with username
    if (titleElement) {
        titleElement.textContent = results.username ? 
            `Great job, ${results.username}!` : 
            'Your Results';
    }
    
    // Update score badge
    if (scoreBadge) {
        scoreBadge.innerHTML = `
            <i class="fas fa-star me-2"></i>Score: ${results.score}/${results.totalQuestions} (${results.percentage}%)
        `;
        
        // Add different colors based on performance
        scoreBadge.className = 'badge fs-3 px-4 py-3 mb-3 ' + getScoreBadgeClass(results.percentage);
    }
    
    // Update message based on performance
    if (messageElement) {
        messageElement.textContent = getPerformanceMessage(results.percentage, results.username);
    }
}

function getScoreBadgeClass(percentage) {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 70) return 'bg-primary';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-danger';
}

function getPerformanceMessage(percentage, username) {
    const name = username || 'You';
    
    if (percentage === 100) {
        return `Perfect score! ${name} got every question right! 🎉`;
    } else if (percentage >= 90) {
        return `Excellent work! ${name} really know${username ? 's' : ''} your stuff! 🌟`;
    } else if (percentage >= 70) {
        return `Good job! ${name} did well, but there's room for improvement. 👍`;
    } else if (percentage >= 50) {
        return `Not bad! ${name} got more than half right. Keep practicing! 📚`;
    } else {
        return `${name} might want to review the material and try again. Don't give up! 💪`;
    }
}
