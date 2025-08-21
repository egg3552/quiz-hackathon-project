// Results page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get quiz results from localStorage
    const quizResultsData = localStorage.getItem('quizResults'); // Retrieve stored quiz results
    
    if (!quizResultsData) { // Check if results exist
        // No results found, redirect to home
        window.location.href = 'index.html'; // Redirect if no results found
        return; // Exit function
    }
    
    try {
        const results = JSON.parse(quizResultsData); // Parse JSON results data
        
        // Save score to leaderboard if not already saved
        if (!results.savedToLeaderboard) { // Check if not already saved to prevent duplicates
            saveToLeaderboard(results); // Add score to leaderboard
            
            // Mark as saved to prevent duplicate entries
            results.savedToLeaderboard = true; // Flag as saved
            localStorage.setItem('quizResults', JSON.stringify(results)); // Update stored results
        }
        
        // Update the results display
        updateResultsDisplay(results); // Show results on page
    } catch (error) {
        console.error('Error parsing quiz results:', error);
        // Redirect to home if data is corrupted
        window.location.href = 'index.html';
    }
});

/**
 * Saves the quiz results to the leaderboard
 */
function saveToLeaderboard(results) {
    const scores = getLeaderboardScores(); // Get existing leaderboard scores
    const newScore = { // Create new score entry
        username: results.username || 'Anonymous',
        score: results.score,
        totalQuestions: results.totalQuestions,
        percentage: results.percentage,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };
    
    scores.push(newScore); // Add new score to array
    
    // Sort by percentage (highest first), then by timestamp (newest first)
    scores.sort((a, b) => { // Sort scores by performance
        if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage; // Primary sort by percentage
        }
        return b.timestamp - a.timestamp; // Secondary sort by time
    });
    
    // Keep only top 10 scores
    const topScores = scores.slice(0, 10); // Limit to top 10 entries
    
    localStorage.setItem('quizLeaderboard', JSON.stringify(topScores)); // Save updated leaderboard
}

/**
 * Gets leaderboard scores from localStorage
 */
function getLeaderboardScores() {
    const scores = localStorage.getItem('quizLeaderboard'); // Retrieve stored leaderboard
    return scores ? JSON.parse(scores) : []; // Return parsed scores or empty array
}

function updateResultsDisplay(results) {
    const titleElement = document.getElementById('results-title'); // Find title element
    const scoreBadge = document.getElementById('score-badge'); // Find score badge element
    const messageElement = document.getElementById('results-message'); // Find message element
    
    // Update title with username
    if (titleElement) { // Check if title element exists
        titleElement.textContent = results.username ? // Set personalized or generic title
            `Great job, ${results.username}!` : 
            'Your Results';
    }
    
    // Update score badge
    if (scoreBadge) { // Check if score badge exists
        scoreBadge.innerHTML = ` 
            <i class="fas fa-star me-2"></i>Score: ${results.score}/${results.totalQuestions} (${results.percentage}%)
        `; // Set score display HTML
        
        // Add different colors based on performance
        scoreBadge.className = 'badge fs-3 px-4 py-3 mb-3 ' + getScoreBadgeClass(results.percentage); // Apply performance-based styling
    }
    
    // Update message based on performance
    if (messageElement) { // Check if message element exists
        messageElement.textContent = getPerformanceMessage(results.percentage, results.username); // Set performance message
    }
}

function getScoreBadgeClass(percentage) {
    if (percentage >= 90) return 'bg-success'; // Green for excellent scores
    if (percentage >= 70) return 'bg-primary'; // Blue for good scores
    if (percentage >= 50) return 'bg-warning'; // Yellow for average scores
    return 'bg-danger'; // Red for poor scores
}

function getPerformanceMessage(percentage, username) {
    const name = username || 'You'; // Use username or default to 'You'
    
    if (percentage === 100) { // Perfect score message
        return `Perfect score! ${name} got every question right! 🎉`;
    } else if (percentage >= 90) { // Excellent score message
        return `Excellent work! ${name} really know${username ? 's' : ''} your stuff! 🌟`;
    } else if (percentage >= 70) { // Good score message
        return `Good job! ${name} did well, but there's room for improvement. 👍`;
    } else if (percentage >= 50) { // Average score message
        return `Not bad! ${name} got more than half right. Keep practicing! 📚`;
    } else { // Poor score message
        return `${name} might want to review the material and try again. Don't give up! 💪`;
    }
}
