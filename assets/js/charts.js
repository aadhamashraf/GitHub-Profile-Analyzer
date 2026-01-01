
/**
 * @module charts.js
 * Handles Chart.js integration for language statistics.
 */

let languageChartInstance = null;
const colors = {
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'TypeScript': '#2b7489',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'Dart': '#00B4AB',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Vue': '#41b883',
    'Jupyter Notebook': '#DA5B0B'
};

export function getLangColor(lang) {
    return colors[lang] || '#8b949e';
}

export function renderLanguageChart(repos) {
    const ctx = document.getElementById('languageChart').getContext('2d');
    const languages = {};
    repos.forEach(repo => {
        if (repo.language) languages[repo.language] = (languages[repo.language] || 0) + 1;
    });

    const sortedLangs = Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const labels = sortedLangs.map(l => l[0]);
    const data = sortedLangs.map(l => l[1]);
    const chartColors = labels.map(l => getLangColor(l));

    if (languageChartInstance) languageChartInstance.destroy();

    languageChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: chartColors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'bottom', labels: { color: '#c9d1d9', font: { size: 11 } } }
            }
        }
    });

    // Return instance if needed by other modules (though we try to avoid globals)
    return languageChartInstance;
}
