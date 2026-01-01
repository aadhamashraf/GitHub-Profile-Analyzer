
/**
 * @module api.js
 * Handles API calls to GitHub.
 */

export async function fetchGitHubProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found.");
    return await response.json();
}

export async function fetchGitHubRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if (!response.ok) throw new Error("Error fetching repositories.");
    return await response.json();
}
