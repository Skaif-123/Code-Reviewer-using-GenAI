require("dotenv").config({ path: "E:/Project GenAI/.env" });
console.log("KEY:", process.env.G_API_KEY);
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.G_API_KEY });

const review=async function generateContent(prompt) {
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
module.exports=review
