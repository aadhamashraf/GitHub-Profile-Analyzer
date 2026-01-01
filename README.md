# **GitHub Profile & AI Analyzer**

A powerful, local-first tool that analyzes GitHub profiles using **advanced metrics** and **local AI** (Ollama) to provide deep insights, career advice, and project ideas.

![GitHub Analyzer Banner](https://via.placeholder.com/1200x400.png?text=GitHub+Profile+Analyzer+Dashboard)

## **Key Features**

### **AI-Powered Insights (Local & Free)**
*   **Developer Archetype**: Automatically classifies devs (e.g., *"Frontend Ninja"*, *"FullStack Architect"*).
*   **Career Strengths**: Analyzes code style, consistency, and bio.
*   **Project Ideas**: Generates personalized project suggestions based on tech stack.
*   **Real-Time Streaming**: Watch the analysis generate live (via Phi/Mistral models).

### **Visual Analytics**
*   **Profile Score**: A calculated 0-100 score based on bio, activity, and repo health.
*   **Language Tech Stack**: Beautiful Chart.js doughnut chart of top languages.
*   **Repository Diagnostics**: Identifies missing descriptions, licenses, and unmaintained repos.

### **Deep Data Fetching**
*   Fetches up to 100 repositories securely.
*   Aggregates total stars, forks, and followers.
*   Identifies "Top Repositories" by popularity.

---

## **Tech Stack**
*   **Frontend**: Vanilla HTML5, Modern CSS3 (Glassmorphism), JavaScript (ES6+).
*   **Libraries**: `Chart.js` (Visuals), `FontAwesome` (Icons).
*   **AI Engine**: [Ollama](https://ollama.ai) (Local LLM server).
*   **Deployment**: Runs locally without a backend server.

---

## **Quick Start Guide**

### **Prerequisites**
1.  **Git** installed.
2.  **[Ollama](https://ollama.ai)** installed (for AI features).
3.  **Python** (optional, for local server).

### **1. Install & Run**
```bash
# Clone the repository
#
#
# Start a simple local server (Recommended for API calls)
python -m http.server 
# OR
npx http-server
```
*Open `http://localhost:8000` in your browser.*

### **2. Setup AI (Ollama)**
For the AI analysis to work, you need Ollama running locally.
1.  Download **Ollama** from [ollama.ai](https://ollama.ai).
2.  Pull a fast analysis model (e.g., **phi** or **mistral**):
    ```bash
    ollama pull phi
    ```
3.  The app connects gracefully to `http://localhost:11434`.

---

## **🎯 How It Works**
1.  **Search**: Enter any GitHub username.
2.  **Scoring**: The app calculates a "Profile Score" (0-100) checking for:
    *   Bio/Location/Company presence
    *   Readme existence
    *   Star count & Fork activity
3.  **Streaming Analysis**: The app sends profile data to your local Ollama instance, which streams back a formatted analysis in real-time.


## **📄 License**
MIT License. Free to use and modify.

---
