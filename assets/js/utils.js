
/**
 * @module utils.js
 * Helper functions for scoring and math.
 */

/* --- LOGIC: PROFILE SCORE --- */
export function calculateScore(profile, repos) {
    let score = 0;

    // Basic Checks (40pts)
    if (profile.bio) score += 10;
    if (profile.location) score += 5;
    if (profile.company) score += 5;
    if (profile.blog) score += 5;
    if (profile.email) score += 5;
    if (profile.twitter_username) score += 5;
    if (profile.followers > 10) score += 5;

    // Repo Checks (40pts)
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    if (repos.length > 5) score += 10;
    if (totalStars > 50) score += 10;
    if (totalStars > 100) score += 10;

    const hasReadme = repos.some(r => r.size > 0);
    if (hasReadme) score += 10;

    // Consistency Bonus
    score += 20;

    return Math.min(score, 100);
}
