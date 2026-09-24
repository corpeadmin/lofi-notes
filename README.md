# 🎧 Lofi Notes ♫

> **Soft beats in the background, a quiet corner, and a place to write things down.**

**Lofi Notes** is a simple and cozy full-stack notes application built with **Django REST Framework** and **React**. It provides a clean space where users can create, view, edit, and delete notes while keeping everything stored locally in a **SQLite database**.

The project intentionally keeps things simple: **no login, no tags, no search, and no unnecessary features** — just a peaceful place for your thoughts.

---

## ✨ Purpose

Lofi Notes is designed to be a small but fully functional full-stack application that is easy to understand, install, and modify.

It was created to:

* 🧩 Practice building a **full-stack web application**
* 🔌 Learn how a **React frontend communicates with a REST API**
* 🗄️ Understand **Django models and SQLite database storage**
* 🛠️ Practice complete **CRUD operations**
* 🌱 Learn a practical **Git and GitHub workflow**
* 🚀 Provide a project that can be installed and run locally in just a few steps

For the Git classroom activity, follow the instructions in [`SETUP.md`](SETUP.md).

---

## 🌙 Features

### 🏠 Landing Page

A calm and minimal welcome page that introduces the Lofi Notes application.

### 📝 Notes Page

View all saved notes and create new notes from one convenient page.

### 📖 Note Detail Page

Open an individual note to:

* Read the note
* Edit the content
* Update the note
* Delete the note

### 💾 Persistent Storage

Notes are stored permanently in a local **SQLite database** through the Django REST API.

### 🔄 Full CRUD

The application supports all four basic database operations:

* **Create**
* **Read**
* **Update**
* **Delete**

### 🎨 Cozy Lo-Fi Design

The React frontend uses a soft, simple, and relaxing visual style inspired by lo-fi aesthetics.

---

## 🛠️ Tech Stack

| Layer               | Technology            |
| ------------------- | --------------------- |
| **Backend**         | Django                |
| **API**             | Django REST Framework |
| **Database**        | SQLite                |
| **Frontend**        | React                 |
| **Build Tool**      | Vite                  |
| **Routing**         | React Router          |
| **Communication**   | REST API / JSON       |
| **Version Control** | Git & GitHub          |

---

## 📱 Application Pages

Lofi Notes contains exactly **three main pages**:

### 1. Landing Page

**Route:**

```text
/
```

Provides a welcoming introduction to the application.

### 2. Notes Page

**Route:**

```text
/notes
```

Allows users to:

* View all notes
* Create a new note

### 3. Note Detail Page

**Route:**

```text
/notes/:id
```

Allows users to:

* View a specific note
* Edit the note
* Delete the note

---

## 🔌 REST API

The Django REST Framework API is available under:

```text
/api/notes/
```

### API Endpoints

| Action        | Endpoint          | Method          |
| ------------- | ----------------- | --------------- |
| Create a note | `/api/notes/`     | `POST`          |
| Get all notes | `/api/notes/`     | `GET`           |
| Get one note  | `/api/notes/:id/` | `GET`           |
| Update a note | `/api/notes/:id/` | `PUT` / `PATCH` |
| Delete a note | `/api/notes/:id/` | `DELETE`        |

### Example API Request

Create a note:

```http
POST /api/notes/
Content-Type: application/json
```

```json
{
  "title": "Study Notes",
  "content": "Review Django REST Framework today."
}
```

Example response:

```json
{
  "id": 1,
  "title": "Study Notes",
  "content": "Review Django REST Framework today."
}
```

---

## 📁 Project Structure

```text
lofi-notes/
│
├── README.md
├── SETUP.md
├── .gitignore
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3
│   │
│   ├── notes/
│   │   └── settings.py
│   │
│   └── api/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── migrations/
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    │
    └── src/
        ├── App.jsx
        ├── api.js
        ├── styles.css
        │
        └── components/
            ├── LandingPage.jsx
            ├── NotesPage.jsx
            └── NoteDetailPage.jsx
```

---

# 🚀 Getting Started

Follow the steps below to run Lofi Notes on your computer.

## 📋 Prerequisites

Before starting, make sure you have:

* **Python 3.10 or higher**
* **Node.js 18 or higher**
* **npm**
* **Git** *(optional, but recommended)*

You can check your installed versions with:

```bash
python --version
node --version
npm --version
git --version
```

---

# ⚙️ Backend Setup

The backend uses **Django + Django REST Framework**.

### 1. Open the project

```bash
cd lofi-notes
```

### 2. Enter the backend folder

```bash
cd backend
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Run database migrations

```bash
python manage.py migrate
```

### 7. Start the Django server

```bash
python manage.py runserver
```

The backend will be available at:

```text
http://127.0.0.1:8000/
```

The notes API can be accessed at:

```text
http://127.0.0.1:8000/api/notes/
```

> **Keep this terminal running** while using the frontend.

---

# ⚛️ Frontend Setup

The frontend uses **React + Vite**.

Open a **new terminal** and navigate to the frontend:

```bash
cd lofi-notes/frontend
```

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Vite will provide a local address similar to:

```text
http://localhost:5173/
```

Open the address in your browser.

---

# 🔗 Frontend and Backend Connection

The React application communicates with Django through the REST API.

The Vite development server is configured to proxy:

```text
/api
```

to the Django backend:

```text
http://127.0.0.1:8000
```

This means the frontend can make requests such as:

```text
GET    /api/notes/
POST   /api/notes/
GET    /api/notes/1/
PATCH  /api/notes/1/
DELETE /api/notes/1/
```

without manually adding the Django server URL to every request.

---

# 🗄️ Database

Lofi Notes uses **SQLite**, which is included with Django and requires no separate database server.

After running:

```bash
python manage.py migrate
```

Django creates the SQLite database file:

```text
backend/db.sqlite3
```

All notes created through the application are stored in this database.

---

# 🔄 CRUD Workflow

The application follows a simple CRUD workflow:

```text
             ┌───────────────┐
             │  React App    │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │   REST API    │
             │ Django + DRF  │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │    SQLite     │
             │    Database   │
             └───────────────┘
```

### Create

User creates a new note.

```text
React → POST → Django REST API → SQLite
```

### Read

User views saved notes.

```text
React → GET → Django REST API → SQLite
```

### Update

User edits an existing note.

```text
React → PUT/PATCH → Django REST API → SQLite
```

### Delete

User removes a note.

```text
React → DELETE → Django REST API → SQLite
```

---

# 🌱 Git & GitHub Workflow

This project can also be used to practice a basic collaborative Git workflow:

```text
Clone
  ↓
Create Branch
  ↓
Make Changes
  ↓
git add
  ↓
git commit
  ↓
git push
  ↓
Create Pull Request
  ↓
Owner Review
  ↓
Merge
```

For the complete classroom activity, see:

👉 [`SETUP.md`](SETUP.md)

---

# 🧪 Testing the API

Once Django is running, open:

```text
http://127.0.0.1:8000/api/notes/
```

You should be able to view the Django REST Framework API interface.

You can also test the API using tools such as:

* Browser
* Postman
* Insomnia
* React frontend
* `curl`

Example:

```bash
curl http://127.0.0.1:8000/api/notes/
```

---

# 🛠️ Troubleshooting

### Django server is not starting

Make sure your virtual environment is activated and dependencies are installed:

```bash
venv\Scripts\activate
pip install -r requirements.txt
```

Then run:

```bash
python manage.py runserver
```

### Database errors

Run the migrations again:

```bash
python manage.py migrate
```

### Frontend dependencies are missing

Inside the `frontend` folder:

```bash
npm install
```

Then:

```bash
npm run dev
```

### API is not loading

Make sure the Django server is running:

```bash
python manage.py runserver
```

Then check:

```text
http://127.0.0.1:8000/api/notes/
```

---

# 🎯 Project Goals

Lofi Notes demonstrates the following full-stack development concepts:

* ✅ React component development
* ✅ React Router navigation
* ✅ REST API communication
* ✅ Django REST Framework
* ✅ Database models
* ✅ SQLite persistence
* ✅ CRUD operations
* ✅ Frontend/backend integration
* ✅ Git branching
* ✅ Git commits and pushes
* ✅ Pull Requests
* ✅ Basic project documentation

---

# 📌 Project Philosophy

> **Keep it simple. Keep it useful. Keep it cozy.**

Lofi Notes focuses on the essentials of a full-stack application without adding unnecessary complexity.

It is a learning project, a CRUD application, and a small digital notebook — all in one.

---

## 📄 License

This project is intended for **educational and learning purposes**.

---

## 🎧 Enjoy Your Notes

Open the app, put on some lo-fi music, and start writing.

**Happy coding. ♫**


## 🌸 New Features

### ⏳ Focus Mode

Focus Mode is a gentle study timer designed to help users stay focused while studying, reading, or working on important tasks. Users can start a timer and dedicate a quiet period of time to their work without unnecessary distractions. When the timer ends, users can take a short break before beginning another focused session.

**Focus Mode helps turn study time into a calm and productive moment, one minute at a time.** 🌙📚

### 🌷 Note Flowery

Note Flowery gives users a softer and more expressive way to write their notes. Instead of making notes feel plain and ordinary, the feature adds a cozy and charming atmosphere that makes writing feel more personal and enjoyable.

Users can use Note Flowery to decorate their thoughts with a gentle, floral-inspired style, making each note feel like a small digital garden where ideas, memories, and study notes can quietly grow. 🌸🌿

**Note Flowery turns simple words into little blossoms of thought.** ✨
