
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

// Check whether the backend is running
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "AI Chatbot backend is running",
    apiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Student Support chatbot instructions
const SYSTEM_PROMPT = `
You are AI Student Support, a friendly and supportive student assistant.

Your responsibilities:
- Help students manage study workload and assignments.
- Suggest practical study plans and time-management strategies.
- Listen empathetically when students feel stressed about studying.
- Break difficult academic tasks into manageable steps.
- Communicate clearly and use simple language.
- Reply in the language used by the student, Thai or English.
- Do not invent university policies or claim to be a professional therapist.
- For serious emotional distress, encourage the student to seek help
  from a trusted person or qualified professional.
- Be honest when you do not know something.

Be warm, respectful, non-judgmental, and concise.
`;

// Send a message to Gemini
app.post("/api/chat", async (req, res) => {
  const { message } = req.body || {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Please provide a valid message.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    return res.status(503).json({
      error: "Gemini API key is not configured yet.",
      message: "The backend is running, but AI responses are not enabled.",
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: message.trim() }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
        signal: AbortSignal.timeout(30000),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", response.status, data.error?.message);

      return res.status(502).json({
        error: "Gemini API request failed.",
        message:
          response.status === 429
            ? "The API quota may have been reached. Please try again later."
            : "Could not get a response from Gemini. Check the server terminal.",
      });
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!answer) {
      return res.status(502).json({
        error: "Gemini returned an empty response.",
      });
    }

    return res.json({ text: answer });
  } catch (error) {
    console.error("Chat request failed:", error.message);

    return res.status(502).json({
      error: "Unable to connect to Gemini.",
      message: "Please check your connection and try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI Chatbot server running at http://localhost:${PORT}`);
});
