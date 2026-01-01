
/**
 * @module main.js
 * Entry point for GitHub Profile Analyzer.
 */

import { fetchGitHubProfile, fetchGitHubRepos } from './api.js';
import { updateElement, showLoading, renderTopRepos, renderDiagnostics, animateScore } from './ui.js';
import { renderLanguageChart } from './charts.js';
import { calculateScore } from './utils.js';
import { generateProfileAnalysis } from './ai.js';

// State
let profileData = null;
let profileRepos = null;

// Event Listeners
document.getElementById("search-btn").addEventListener("click", fetchProfile);
document.getElementById("username").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') fetchProfile();
});

// Main Fetch Logic
async function fetchProfile() {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a GitHub username.");
        return;
    }

    try {
        // UI Reset
        document.getElementById("welcome-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");

        // Fetch Profile
        profileData = await fetchGitHubProfile(username);
        renderProfileInfo(profileData);

        // Fetch Repos
        showLoading("repo-container");
        profileRepos = await fetchGitHubRepos(username);

        // Render Stats
        updateElement("total-stars", profileRepos.reduce((acc, r) => acc + r.stargazers_count, 0));
        updateElement("total-forks", profileRepos.reduce((acc, r) => acc + r.forks_count, 0));

        // Render Visuals
        renderTopRepos(profileRepos);
        renderLanguageChart(profileRepos);
        renderDiagnostics(profileRepos);

        // Score
        const score = calculateScore(profileData, profileRepos);
        animateScore(score);

        // AI Analysis
        generateProfileAnalysis(profileData, profileRepos);

    } catch (error) {
        alert("Error: " + error.message);
        console.error(error);
    }
}

function renderProfileInfo(data) {
    updateElement("name", data.name || data.login);
    updateElement("login", `@${data.login}`);
    updateElement("bio", data.bio || "No bio available.");
    updateElement("location", data.location || "N/A");
    updateElement("followers", data.followers);
    updateElement("following", data.following);
    updateElement("public_repos", data.public_repos);
    updateElement("company", data.company || "N/A");
    updateElement("twitter", data.twitter_username ? `@${data.twitter_username}` : "N/A");

    const joinedDate = new Date(data.created_at).toLocaleDateString();
    updateElement("joined", `Joined ${joinedDate}`);

    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("profile_link").href = data.html_url;
}
