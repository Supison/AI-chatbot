# AI Student Support Chatbot

An AI chatbot project designed to help university students manage study workloads, organize assignments, and receive supportive study advice.

## Features

- Chat interface for sending and receiving messages
- Separate frontend and backend structure
- Backend API for processing chat requests
- Gemini API integration prepared for AI-generated responses
- Thai and English language support through the chatbot instructions
- Environment variable configuration for API keys

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **AI Integration:** Google Gemini API
- **Development Tools:** Visual Studio Code, Git, GitHub

## Project Structure

```text
AI-chatbot/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Supison/AI-chatbot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd AI-chatbot
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root using `.env.example` as a reference.

5. Configure the environment variables:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-2.5-flash
   PORT=3000
   ```

6. Start the server:

   ```bash
   npm start
   ```

7. Open `http://localhost:3000` in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key |
| `GEMINI_MODEL` | Gemini model name |
| `PORT` | Local server port |

**Security:** Never commit your `.env` file or expose your API key in public repositories.

## Current Status

The frontend and backend are implemented, and the application can run locally. Gemini API integration is prepared, but AI-generated responses require a valid API key and further testing.

## Learning Objectives

- Practice frontend and backend separation
- Build REST API endpoints using Express.js
- Manage environment variables securely
- Learn how to integrate an external AI API

## Author

Supison — Computer Engineering Student, Mae Fah Luang University
