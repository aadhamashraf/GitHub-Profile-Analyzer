
/**
 * @module ui.js
 * Handles DOM updates and UI rendering.
 */

import { getLangColor } from './charts.js';

export function updateElement(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

export function showLoading(containerId) {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = `<div class="loading"><i class="fas fa-circle-notch fa-spin"></i> Loading data...</div>`;
}

export function animateScore(finalScore) {
    const circle = document.getElementById("score-ring");
    const text = document.getElementById("score-text");

    // For the specific path used (M18 2.0845 a 15.9155 15.9155 ...)
    // circumference is exactly 100

    circle.style.strokeDasharray = `${finalScore}, 100`;

    // Animate text
    let currentScore = 0;
    const interval = setInterval(() => {
        currentScore++;
        text.innerText = currentScore;
        if (currentScore >= finalScore) clearInterval(interval);
    }, 20);

    // Score Message
    const msgEl = document.getElementById("score-msg");
    if (finalScore >= 90) msgEl.innerText = "Elite Profile";
    else if (finalScore >= 70) msgEl.innerText = "Solid Engineer";
    else if (finalScore >= 50) msgEl.innerText = "Growing Dev";
    else msgEl.innerText = "Needs Polish";
}

export function renderTopRepos(repos) {
    const repoContainer = document.getElementById("repo-container");
    repoContainer.innerHTML = "";

    // Sort by stars descending
    const topRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

    if (topRepos.length === 0) {
        repoContainer.innerHTML = "<p>No public repositories found.</p>";
        return;
    }

    topRepos.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("repo-card");

        // Use a data attribute or global handler for modal if needed, 
        // but for now keeping inline minimal or event listener in main.js
        // Actually, we can dispatch a custom event or let main handle it via delegation.
        // For simplicity, we'll open directly window.open or attach listener later.

        repoCard.innerHTML = `
            <div>
                <div class="repo-top">
                    <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                    <span class="repo-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                </div>
                <p class="repo-desc">${repo.description || "No description provided."}</p>
            </div>
            <div class="repo-footer">
                <span>
                    <span class="lang-dot" style="background-color: ${getLangColor(repo.language)}"></span>
                    ${repo.language || 'Unknown'}
                </span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
            </div>
        `;

        // Re-attach specific click listener if needed for modal - skipped for now to keep simple
        repoContainer.appendChild(repoCard);
    });
}

export function renderDiagnostics(repos) {
    const diagList = document.getElementById("diagnostic-list");
    diagList.innerHTML = "";

    const issues = [];
    const noDesc = repos.filter(r => !r.description).length;
    const noLicense = repos.filter(r => !r.license).length;
    const archived = repos.filter(r => r.archived).length; // fixed property name

    if (noDesc > 0) issues.push(`⚠️ ${noDesc} repos missing descriptions.`);
    if (noLicense > 0) issues.push(`⚖️ ${noLicense} repos have no license.`);
    if (archived > 0) issues.push(`📦 ${archived} archived repositories.`);

    if (issues.length === 0) {
        diagList.innerHTML = "<li>✅ All repositories look healthy!</li>";
    } else {
        issues.forEach(i => diagList.innerHTML += `<li>${i}</li>`);
    }
}
