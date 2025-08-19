// Leaderboard functionality
document.addEventListener('DOMContentLoaded', function() {
    displayLeaderboard(); // Load and show leaderboard on page load
    
    // Add event listener for clear leaderboard button
    const clearButton = document.getElementById('clearLeaderboard'); // Find clear button
    if (clearButton) {
        clearButton.addEventListener('click', clearLeaderboard); // Attach clear functionality
    }
    
    // Add event listener for back button
    const backButton = document.querySelector('.btn-back'); // Find back button
    if (backButton) {
        backButton.addEventListener('click', function() { // Add back navigation
            window.history.back(); // Go to previous page
        });
    }
});

/**
 * Gets all scores from localStorage
 */
function getAllScores() {
    const scores = localStorage.getItem('quizLeaderboard'); // Retrieve stored leaderboard data
    return scores ? JSON.parse(scores) : []; // Return parsed scores or empty array
}

/**
 * Saves a new score to the leaderboard
 */
function saveScore(username, score, totalQuestions, percentage) {
    const scores = getAllScores();
    const newScore = {
        username: username || 'Anonymous',
        score: score,
        totalQuestions: totalQuestions,
        percentage: percentage,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };
    
    scores.push(newScore); // Add new score to array
    
    // Sort by percentage (highest first), then by timestamp (newest first)
    scores.sort((a, b) => { // Sort scores by performance
        if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage; // Primary sort by percentage
        }
        return b.timestamp - a.timestamp; // Secondary sort by timestamp
    });
    
    // Keep only top 10 scores
    const topScores = scores.slice(0, 10); // Limit to top 10 entries
    
    localStorage.setItem('quizLeaderboard', JSON.stringify(topScores)); // Save updated leaderboard
    return topScores; // Return updated scores array
}

/**
 * Displays the leaderboard
 */
function displayLeaderboard() {
    const scores = getAllScores(); // Get all leaderboard scores
    const leaderboardBody = document.getElementById('leaderboardBody'); // Find table body element
    const noScoresMessage = document.getElementById('noScoresMessage'); // Find no scores message element
    
    if (!leaderboardBody) return; // Exit if table body doesn't exist
    
    if (scores.length === 0) { // Check if no scores exist
        leaderboardBody.innerHTML = ''; // Clear table content
        if (noScoresMessage) {
            noScoresMessage.style.display = 'block'; // Show no scores message
        }
        return; // Exit function
    }
    
    if (noScoresMessage) {
        noScoresMessage.style.display = 'none'; // Hide no scores message
    }
    
    leaderboardBody.innerHTML = scores.map((score, index) => { // Generate table rows for each score
        const rankClass = getRankClass(index); // Get CSS class for rank styling
        const badge = getRankBadge(index); // Get badge icon for rank
        
        return ` // Return HTML for table row
            <tr class="${rankClass}">
                <td class="text-center">
                    <span class="rank-badge ${badge.class}">${badge.icon}</span>
                    <span class="rank-number">${index + 1}</span>
                </td>
                <td class="fw-semibold">${escapeHtml(score.username)}</td>
                <td class="text-center">
                    <span class="score-badge">${score.score}/${score.totalQuestions}</span>
                </td>
                <td class="text-center">
                    <span class="percentage-badge ${getPercentageBadgeClass(score.percentage)}">${score.percentage}%</span>
                </td>
                <td class="text-muted text-center">${score.date}</td>
            </tr>
        `;
    }).join(''); // Join all table rows into single string
}

/**
 * Gets CSS class for rank row
 */
function getRankClass(index) {
    if (index === 0) return 'table-warning'; // Gold background for 1st place
    if (index === 1) return 'table-secondary'; // Silver background for 2nd place
    if (index === 2) return 'table-info'; // Bronze background for 3rd place
    return ''; // No special styling for other ranks
}

/**
 * Gets rank badge icon and class
 */
function getRankBadge(index) {
    const badges = [ // Array of badge configurations for top 3 ranks
        { icon: '🏆', class: 'badge-gold' },
        { icon: '🥈', class: 'badge-silver' },
        { icon: '🥉', class: 'badge-bronze' }
    ];
    
    return badges[index] || { icon: '', class: '' }; // Return badge for rank or empty object
}

/**
 * Gets CSS class for percentage badge
 */
function getPercentageBadgeClass(percentage) {
    if (percentage >= 90) return 'bg-success'; // Green for excellent scores
    if (percentage >= 70) return 'bg-primary'; // Blue for good scores
    if (percentage >= 50) return 'bg-warning'; // Yellow for average scores
    return 'bg-danger'; // Red for poor scores
}

/**
 * Escapes HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div'); // Create temporary div element
    div.textContent = text; // Set text content (auto-escapes HTML)
    return div.innerHTML; // Return escaped HTML
}

/**
 * Clears the leaderboard
 */
function clearLeaderboard() {
    if (confirm('Are you sure you want to clear the leaderboard? This cannot be undone.')) { // Confirm action
        localStorage.removeItem('quizLeaderboard'); // Remove leaderboard data
        displayLeaderboard(); // Refresh display to show empty state
    }
}

/**
 * Exports leaderboard functions for use in other scripts
 */
window.leaderboard = { // Make functions globally available
    saveScore: saveScore,
    getAllScores: getAllScores,
    displayLeaderboard: displayLeaderboard
};
