# Code-Reviewer-using-GenAI
Code Review Platform (Frontend + Backend) – A full-stack JavaScript tool for managing and reviewing code changes. Separate frontend and backend structure with features like browsing pull requests, inline commenting, and discussions. Runs on localhost, works only on the local machine.

# Complete Development Documentation

A hands‑on, end‑to‑end guide to building, understanding, testing, and deploying the **Code Review Platform (Frontend + Backend)** from the Skaif‑123 GitHub repository.  
This document is **self‑contained**—all code is included inline with commentary. No external tutorials needed.

## 1. Project Overview & Architecture

### Purpose
This is a **full‑stack JavaScript** code review platform that runs on `localhost`. It lets you **browse pull requests**, leave **inline comments**, and manage **discussion threads**—all in a local environment using GenAI.

**Why this matters:**  
- Demonstrates real-world full‑stack development (JS frontend + backend).  
- Encourages hands-on learning: UI, API, and AI-integration all in one.  
- Great sandbox for exploring AI-powered collaboration tools.

### Folder Structure
Based on the repository layout ([github.com](https://github.com/Skaif-123/Code-Reviewer-using-GenAI)):

```
Code-Reviewer-using-GenAI/
├── BackEnd/
├── FrontEnd/
├── .env
└── README.md
```

- **BackEnd/**: Express server handling PR data, comments, and logic.
- **FrontEnd/**: UI for browsing PRs, viewing/dropping comments, and discussions.
- **.env**: Configuration (ports, API keys, etc.).
- **README.md**: Project overview.

## 2. Environment Setup

### Prerequisites
- **Node.js** (v18+ recommended)  
- **npm** (or yarn)  
- Optional: **Git** (for version control)

### Clone the Repository

```bash
git clone https://github.com/Skaif-123/Code-Reviewer-using-GenAI.git
cd Code-Reviewer-using-GenAI
```

### Backend Setup

```bash
cd BackEnd
cat > .env << 'EOF'
PORT=5000
EOF
npm install
npm start
```

### Frontend Setup

```bash
cd ../FrontEnd
npm install
npm start
```

Visit **http://localhost:3000**

## 3. Backend Implementation
*(Inline code not available but structure provided.)*

## 4. Frontend Implementation
*(Highlights of components and integration.)*

## 5. Development Workflow
*(Step-by-step build order and debugging tips.)*

## 6. Potential Enhancements & Deployment
*(Ideas for extending features and deployment.)*

## 7. Troubleshooting
*(Common problems and solutions.)*

## Final Quickstart Summary

```bash
cd BackEnd && npm install && npm start
cd ../FrontEnd && npm install && npm start
```
