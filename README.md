# Code-Reviewer-using-GenAI
Code Review Platform (Frontend + Backend) – A full-stack JavaScript tool for managing and reviewing code changes. Separate frontend and backend structure with features like browsing pull requests, inline commenting, and discussions. Runs on localhost, works only on the local machine.

![Code Reviwer gif](<Code Reviwer using GenAI.gif>)

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

# Code-Reviewer-using-GenAI — BackEnd Full Inline Code Documentation

This document details the complete backend of the **Code-Reviewer-using-GenAI** project. All files are shown inline with comments.

---

## 1. `server.js`

```javascript
// Load environment variables
require("dotenv").config();

// Import the Express app from src/app.js
const app = require("./src/app");

// Start the server on port 3000
app.listen(3000, () => {
    console.log("server running at port 3000");
});
```

**Why this matters:**  
This is the main entry point. It loads environment variables, initializes the Express app, and starts the server.

---

## 2. `src/app.js`

```javascript
// Import required libraries
const express = require("express");
const app = express();
const cors = require("cors");

// Import API routes
const aiRoutes = require('./routes/ai.routes');

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount AI-related routes under /api
app.use("/api", aiRoutes);

module.exports = app;
```

**Why this matters:**  
This file configures middleware and routes. Keeps main server lean and modular.

---

## 3. `src/services/ai.service.js`

```javascript
// Load environment variables from specified path
require("dotenv").config({ path: "E:/Project GenAI/.env" });
console.log("KEY:", process.env.G_API_KEY);

// Import Google GenAI SDK
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.G_API_KEY });

// AI review service function
const review = async function generateContent(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: `Role: Senior Code Reviewer (7+ years).

What to Do:

Review and improve code only.

Focus on: Code Quality, Best Practices, Performance, Security, Scalability, Readability.

Output must be short, precise, and constructive (bullets or brief points).

Provide fixes or examples if needed.

Rules:

Non-coding input: Reply only with: "Wrong input. Only code reviews allowed."

No unnecessary explanations or tokens wasted.

Output Format:

Issues (bullets)

Recommended Fix (short code if needed)

Quick Notes (optional)`
    },
  });
  console.log(result.text);
  return result.text;
}

module.exports = review;
```

**Why this matters:**  
Centralized AI call logic. Abstracts Gemini integration for reuse. System instruction ensures consistent, professional review output.

---

## 4. `src/routes/ai.routes.js`

```javascript
const express = require("express");
const aiController = require("../controller/ai.controllers");
const router = express.Router();

// Define POST endpoint to get AI review
router.post("/get-review", aiController);

module.exports = router;
```

**Why this matters:**  
Keeps routing and controllers separate. Easy to scale and manage routes.

---

## 5. `src/controller/ai.controllers.js`

```javascript
const generateContent = require("../services/ai.service");

const getReview = async (req, res) => {
    const codePrompt = req.body.code;

    if (!codePrompt) {
        return res.status(404).json({
            message: "You need to enter correct prompt",
        });
    } else {
        const responseData = await generateContent(codePrompt);
        res.status(200).json({
            message: "Successful",
            data: responseData,
        });
    }
}

module.exports = getReview;
```

**Why this matters:**  
Handles request validation and response formatting. Ensures prompt is present and integrates with the AI service.

---

## Summary

- **server.js** boots the server.
- **app.js** configures middleware and routes.
- **ai.routes.js** defines endpoints.
- **ai.controllers.js** handles logic.
- **ai.service.js** integrates Google Gemini AI.

Run the backend:

```bash
cd BackEnd
npm install
node server.js
```


## 4. Frontend Implementation

# Code-Reviewer-using-GenAI — FrontEnd App.jsx Documentation

This document contains the complete **App.jsx** component for the Code-Reviewer-using-GenAI project with inline code and comments.

---

## `App.jsx`

```javascript
import axios from "axios";
import "highlight.js/styles/github-dark.css";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Editor from "react-simple-code-editor";
import rehypeHighlight from "rehype-highlight";

import "./App.css";

function App() {
  // State to hold the user code input
  const [code, setCode] = useState(`const sum = async Add() => {
  return 1 + 1;
};`);

  // State to hold the AI review explanation
  const [codeExplaination, setCodeExplaination] = useState(``);

  // Prism syntax highlighting on component mount/update
  useEffect(() => {
    prism.highlightAll();
  }, []);

  // Function to call backend API to review code
  async function getReview() {
    try {
      const response = await axios.post("http://localhost:3000/api/get-review", {
        code,
      });
      setCodeExplaination(response.data.data);
    } catch (error) {
      setCodeExplaination("Error fetching review. Please try again.");
    }
  }

  return (
    <main>
      {/* LEFT PANEL */}
      <div className="left">
        <div className="code-section">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(newCode) =>
              prism.highlight(newCode, prism.languages.javascript, "javascript")
            }
            padding={12}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: "clamp(14px, 1.8vw, 16px)", // responsive
              minHeight: "100%",
              width: "100%",
              background: "transparent",
              color: "#f8f8f2",
              outline: "none",
            }}
          />
        </div>
        <div className="review-button" onClick={getReview}>
          Review Code
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {codeExplaination || "Your review will appear here..."}
        </Markdown>
      </div>
    </main>
  );
}

export default App;
```

**Key Highlights:**  
- **axios** used to call backend API (`/api/get-review`).  
- **react-simple-code-editor** + **prismjs** used for syntax-highlighted editing.  
- **react-markdown** + **rehype-highlight** for rendering AI review.  
- **Responsive styles** (font size clamps).  
- **Two-panel layout**: Editor on left, review output on right.

**How it Works:**  
1. User writes or pastes code in the editor.  
2. On clicking **Review Code**, a POST request is sent to backend.  
3. AI service returns review text, displayed in right panel using Markdown.

---

## Quick Start for Frontend

```bash
cd FrontEnd
npm install
npm start
```

Visit **http://localhost:3000** to test.


## 5. Development Workflow
# Step-by-step build order can be easily understood by seeing repository

## 6. Trouble Shooting
 1. Gemini API integration code keeps on changing , please use latest code from official site 
 2. Location of .env is very important for accesing API key
 3. API key generated only last for 90 days

## 7. Potential Enhancements & Deployment (Using Docker)

## Potential Enhancements

1. **AI Model Improvements**
   - Upgrade to more advanced Google Gemini or OpenAI models.
   - Add customizable system instructions for specialized reviews.

2. **User Experience**
   - Add AI-suggested fixes with side-by-side code diffs.

3. **Collaboration Features**
   - Multi-user support, real-time comments.
   - Save and retrieve review history from a database.

4. **Security and Performance**
   - Rate limiting, input sanitization.
   - Add caching to reduce API costs.

---

## Deployment with Docker on Render.com

**Why Docker?**  
Docker provides a consistent environment across development and production, making deployment easier and more reliable. Render.com supports deploying services using Docker images.

### Steps to Deploy Backend with Docker on Render.com

1. **Add a Dockerfile to Backend**

Create a `Dockerfile` inside the `BackEnd` directory:

```dockerfile
# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy rest of the backend code
COPY . .

# Expose the port Render will use
EXPOSE 3000

# Command to start the app
CMD ["node", "server.js"]


## Final Quickstart Summary

```bash
cd BackEnd && npm install && npm start
cd ../FrontEnd && npm install && npm start
```
