<div align="center">
  <h1>🪄 Choose-Your-Own-Adventure</h1>
  <p>A full-stack AI storytelling app with FastAPI, React + TypeScript, and Google Generative AI.</p>
  
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status"/>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License"/>
  <img src="https://img.shields.io/badge/React-18-blue" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.1-blue" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/FastAPI-0.119.0-green" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/PostgreSQL-17-blue" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Docker-Ready-blue" alt="Docker"/>
</div>

---

## 📌 Table of Contents

1. [✨ Introduction](#introduction)
2. [🚀 Features](#features)
3. [⚙️ Tech Stack](#tech-stack)
4. [🐳 Docker Setup](#docker-setup)
5. [🛠️ Local Development](#local-development)
6. [🧩 Project Structure](#project-structure)
7. [🧰 API Endpoints](#api-endpoints)
8. [🤝 Contributing](#contributing)
9. [📄 License](#license)

---

## ✨ Introduction

**Choose-Your-Own-Adventure** is an interactive AI-powered storytelling platform where users create branching narratives. Each decision shapes the story, resulting in unique outcomes. The app combines **FastAPI** backend, **React + TypeScript** frontend, and **Google Generative AI** for dynamic content generation.

---

## 🚀 Features

- **AI Story Generation:** Generate original adventure stories on the fly.
- **Branching Choices:** Every decision affects the story’s outcome.
- **Full-Stack Integration:** Seamless communication between frontend and backend.
- **Dockerized Deployment:** Run the entire stack with a single command.
- **Modern UI/UX:** Built with Vite + TailwindCSS for a responsive and sleek interface.
- **Environment-Based Configuration:** Easy to customize via `.env`.

---

## ⚙️ Tech Stack

**Frontend**

- React 18 + TypeScript + Vite
- Tailwind CSS for utility-first styling

**Backend**

- FastAPI + Uvicorn
- SQLAlchemy + Psycopg2 (PostgreSQL)
- Pydantic for request/response validation
- Google Generative AI SDK

**Infrastructure**

- Docker + Docker Compose
- PostgreSQL 17

---

## 🐳 Docker Setup

Run the entire stack in one command:

```bash
docker compose up -d --build
```

````

| Service  | Description            | URL                                                      |
| -------- | ---------------------- | -------------------------------------------------------- |
| frontend | React + Vite app       | [http://localhost:5173](http://localhost:5173)           |
| backend  | FastAPI API server     | [http://localhost:8000/docs](http://localhost:8000/docs) |
| db       | PostgreSQL 17 database | localhost:5432                                           |

---

## 🛠️ Local Development (Optional)

**Backend**

```bash
cd api
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend**

```bash
cd client
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧩 Project Structure

```
choose-your-own-adventure/
│
├── api/               # FastAPI backend
│   ├── main.py
│   ├── routers/
│   ├── core/
│   ├── db/
│   ├── Dockerfile
│   └── .env
│
├── client/            # React + TypeScript + Vite frontend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml # Orchestration for frontend, backend, and DB
```

---

## 🧰 API Endpoints

| Endpoint                           | Method | Description                           |
| ---------------------------------- | ------ | ------------------------------------- |
| `/api/stories/create`              | POST   | Generate a new story based on a theme |
| `/api/jobs/{job_id}`               | GET    | Get story generation status           |
| `/api/stories/{story_id}/complete` | GET    | Fetch completed story                 |

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push (`git push origin feature/my-feature`)
5. Open a Pull Request 🚀

---

## 📄 License

MIT License — see `LICENSE` for details.
````
