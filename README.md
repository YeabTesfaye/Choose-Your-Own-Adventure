# 🪄 CHOOSE-YOUR-OWN-ADVENTURE

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.119.0-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

> ✨ A full-stack AI storytelling app that generates dynamic branching adventures using **FastAPI**, **React + TypeScript**, and **Google Generative AI**.

---

## 🚀 Features

- **AI-Powered Story Generation:** Create original, interactive adventure stories on demand.
- **Branching Narratives:** Each choice leads to unique outcomes and endings.
- **Full-Stack Integration:** React frontend + FastAPI backend + PostgreSQL database.
- **Dockerized Setup:** Run the whole project (frontend, backend, and DB) with one command.
- **Environment-Based Configuration:** Easy customization via `.env`.
- **Modern UI:** Built with Vite + Tailwind for speed and elegance.

---

## ⚙️ Prerequisites

Before you start, make sure you have:

- **Docker** and **Docker Compose**
- **Node.js ≥ 18** (for local frontend development if needed)
- **Python ≥ 3.11** (optional if not using Docker)

---

## 🧱 Project Structure

```
choose-your-own-adventure/
│
├── backend/               # FastAPI application
│   ├── main.py
│   ├── routers/
│   ├── core/
│   ├── db/
│   ├── Dockerfile
│   └── .env
│
├── frontend/              # React + TypeScript + Vite app
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml     # Orchestration for backend, frontend, and PostgreSQL
```

---

## 🐳 Running with Docker

Run the entire stack with a single command:

```bash
docker compose up -d --build
```

This will start:

| Service      | Description            | URL                                                      |
| ------------ | ---------------------- | -------------------------------------------------------- |
| **frontend** | React + Vite app       | [http://localhost:5173](http://localhost:5173)           |
| **backend**  | FastAPI API server     | [http://localhost:8000/docs](http://localhost:8000/docs) |
| **db**       | PostgreSQL 17 database | localhost:5432                                           |

---

## 🧩 Environment Variables (`.env`)

Your backend `.env` file should look like this:

```env
API_PREFIX=/api
DEBUG=True
DATABASE_URL=postgress_database_url
ALLOWED_ORIGINS=["http://localhost:5173"]
GOOGLE_API_KEYS=["apikey1","apikey2"]
```

---

## 🛠️ API Endpoints

| Endpoint                           | Method   | Description                           |
| ---------------------------------- | -------- | ------------------------------------- |
| `/api/stories/create`              | **POST** | Generate a new story based on a theme |
| `/api/jobs/{job_id}`               | **GET**  | Get story generation status           |
| `/api/stories/{story_id}/complete` | **GET**  | Fetch completed story                 |

---

## 🧠 Tech Stack

**Frontend**

- React 18 + TypeScript + Vite
- TailwindCSS

**Backend**

- FastAPI + Uvicorn
- SQLAlchemy + Psycopg2
- Pydantic + Pydantic Settings
- Google Generative AI SDK

**Infrastructure**

- Docker + Docker Compose
- PostgreSQL 17

---

## 🧰 Local Development (Optional)

If you prefer to run it manually without Docker:

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## 🤝 Contributing

1. Fork this repository
2. Create your branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request 🚀

---

## 📄 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

---

## 💡 Future Ideas

- Add authentication (JWT / OAuth)
- Save user story progress to DB
- Enable collaborative story writing
- Implement a leaderboard for creative endings
