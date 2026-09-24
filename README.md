# Lofi Notes ♫

> Soft beats in the background, and a quiet corner to write things down.

Lofi Notes is a small, cozy notes app built with **Django REST Framework** and
**React**. It has exactly three pages, full note CRUD (create, read, update,
delete), and saves everything to a local **SQLite** database. No login, no
tags, no search, no clutter — just you and your thoughts.

## Purpose

This project is intentionally small on purpose. It exists to:

1. Be a **genuinely functional** full-stack app you can install, run, and use
   locally in minutes.
2. Serve as a **hands-on playground for learning Git**: clone → branch →
   change → add → commit → push → Pull Request → owner review → owner merge.
   Follow the step-by-step classroom activity in [`SETUP.md`](SETUP.md).

## Features

- 🏠 **Landing page** — a calm welcome screen.
- 📝 **Notes page** — see all your notes and write new ones.
- 📂 **Note detail page** — open one note, read it, edit it, or delete it.
- 💾 **Persistent storage** — every note lives in a SQLite database via the
  DRF JSON API.

## Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Backend  | Django + Django REST Framework (SQLite)     |
| Frontend | React (Vite) + React Router                 |
| API      | REST endpoints under `/api/notes/`          |
| Git      | Full workflow in [`SETUP.md`](SETUP.md)     |

## Pages

1. **Landing Page** (`/`)
2. **Notes Page** (`/notes`) — list + create
3. **Note Detail Page** (`/notes/:id`) — read, edit, delete

## CRUD Functionality

| Action  | Endpoint                        | Method |
| ------- | ------------------------------- | ------ |
| Create  | `/api/notes/`                   | POST   |
| Read    | `/api/notes/` and `/api/notes/:id/` | GET |
| Update  | `/api/notes/:id/`               | PUT/PATCH |
| Delete  | `/api/notes/:id/`               | DELETE |

## Project Structure

```
lofi-notes/
├── README.md              ← you are here
├── SETUP.md               ← Git step-by-step hands-on activity
├── .gitignore
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── notes/             ← Django project settings
│   └── api/               ← Django app: Note model, serializer, viewset
│       └── migrations/
└── frontend/
    ├── package.json
    ├── vite.config.js     ← dev proxy /api → Django
    ├── index.html
    └── src/
        ├── App.jsx        ← routing
        ├── api.js         ← fetch helpers for the DRF API
        ├── styles.css     ← cozy lo-fi theme
        └── components/
            ├── LandingPage.jsx
            ├── NotesPage.jsx
            └── NoteDetailPage.jsx
```

## Basic Setup

Prerequisites: Python 3.10+, Node 18+, and optionally Git.

**1. Backend (Django + DRF)**

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate    macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API is now at <http://127.0.0.1:8000/api/notes/>.

**2. Frontend (React)**

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:5173> and use the app. The Vite dev server proxies
`/api` calls to Django automatically.

For the full Git classroom exercise (clone, branch, commit, Pull Request,
merge), see **[`SETUP.md`](SETUP.md)**.