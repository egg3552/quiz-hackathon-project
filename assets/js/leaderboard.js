// Leaderboard functionality
document.addEventListener('DOMContentLoaded', function() {
    displayLeaderboard();
    
    // Add event listener for clear leaderboard button
    const clearButton = document.getElementById('clearLeaderboard');
    if (clearButton) {
        clearButton.addEventListener('click', clearLeaderboard);
    }
    
    // Add event listener for back button
    const backButton = document.querySelector('.btn-back');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
});

/**
 * Gets all scores from localStorage
 */
function getAllScores() {
    const scores = localStorage.getItem('quizLeaderboard');
    return scores ? JSON.parse(scores) : [];
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
    return topScores;
}

/**
 * Displays the leaderboard
 */
function displayLeaderboard() {
    const scores = getAllScores();
    const leaderboardBody = document.getElementById('leaderboardBody');
    const noScoresMessage = document.getElementById('noScoresMessage');
    
    if (!leaderboardBody) return;
    
    if (scores.length === 0) {
        leaderboardBody.innerHTML = '';
        if (noScoresMessage) {
            noScoresMessage.style.display = 'block';
        }
        return;
    }
    
    if (noScoresMessage) {
        noScoresMessage.style.display = 'none';
    }
    
    leaderboardBody.innerHTML = scores.map((score, index) => {
        const rankClass = getRankClass(index);
        const badge = getRankBadge(index);
        
        return `
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
    }).join('');
}

/**
 * Gets CSS class for rank row
 */
function getRankClass(index) {
    if (index === 0) return 'table-warning'; // Gold
    if (index === 1) return 'table-secondary'; // Silver
    if (index === 2) return 'table-info'; // Bronze
    return '';
}

/**
 * Gets rank badge icon and class
 */
function getRankBadge(index) {
    const badges = [
        { icon: '🏆', class: 'badge-gold' },
        { icon: '🥈', class: 'badge-silver' },
        { icon: '🥉', class: 'badge-bronze' }
    ];
    
    return badges[index] || { icon: '', class: '' };
}

/**
 * Gets CSS class for percentage badge
 */
function getPercentageBadgeClass(percentage) {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 70) return 'bg-primary';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-danger';
}

/**
 * Escapes HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Clears the leaderboard
 */
function clearLeaderboard() {
    if (confirm('Are you sure you want to clear the leaderboard? This cannot be undone.')) {
        localStorage.removeItem('quizLeaderboard');
        displayLeaderboard();
    }
}

/**
 * Exports leaderboard functions for use in other scripts
 */
window.leaderboard = {
    saveScore: saveScore,
    getAllScores: getAllScores,
    displayLeaderboard: displayLeaderboard
};
