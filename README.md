# 🪄 CHOOSE-YOUR-OWN-ADVENTURE

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111.1-green)

> Generate your own branching adventure stories dynamically! Powered by FastAPI, React + TypeScript, and integrated with Google APIs / LLMs.

---

## 🚀 Features

- **Dynamic Story Generation:** Enter a theme and receive a fully interactive story generated on the fly.
- **Branching Story Paths:** Multiple choices lead to different outcomes, including winning endings.
- **User-Friendly UI:** Modern interface with loading states and error handling.
- **API-Driven:** Backend powered by FastAPI and integrated with Google APIs / Gemini API.
- **Frontend Stack:** React + TypeScript + Vite for fast and type-safe development.

---

## ⚡ Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.11
- `pip` & `venv`

---

### Backend Setup

```bash
cd backend
# Create a virtual environment
python -m venv venv

# Activate it
# macOS/Linux
source venv/bin/activate
# Windows
.\venv\Scripts\activate

# Install dependencies
uv install

```

Create a `.env` file (example provided):

```env
DATABASE_URL=sqlite:///./database.db
API_PREFIX=/api
DEBUG=TRUE
ALLOWED_ORIGINS=["http://localhost:3000","http://localhost:5173"]
GOOGLE_API_KEYS=["key1","key2","key3"]
```

Run the backend with `uvicorn`:

```bash
uv run main.py
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🛠️ API Endpoints

- `POST /stories/create` → Generate a new story by theme.
- `GET /jobs/{job_id}` → Poll story generation status.
- `GET /stories/{story_id}/complete` → Fetch a completed story.

---

## 🎯 Usage

1. Enter a theme (e.g., "space pirates", "medieval quest").
2. Click **Generate Story**.
3. Wait for story generation (loading state shown).
4. Play through the story by choosing options.
5. Explore multiple endings and branching paths.

---

## 📦 Tech Stack

- **Frontend:** React + TypeScript + Vite + TailwindCSS
- **Backend:** Python + FastAPI + Pydantic + SQLite
- **APIs:** Google APIs / Gemini API for story generation

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License – see LICENSE file for details.
