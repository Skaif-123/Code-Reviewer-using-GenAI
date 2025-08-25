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
  const [code, setCode] = useState(`const sum = async Add() => {
  return 1 + 1;
};`);

  const [codeExplaination, setCodeExplaination] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

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
              fontSize: "clamp(14px, 1.8vw, 16px)", // adjusts with screen size
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
