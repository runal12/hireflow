<div align="center">

# 🚀 HireFlow

**A full-stack Job Portal built with Django REST Framework & React**

[![Django](https://img.shields.io/badge/Django-6.0-092E20?style=flat&logo=django&logoColor=white)](https://djangoproject.com)
[![DRF](https://img.shields.io/badge/DRF-3.17-red?style=flat&logo=django)](https://www.django-rest-framework.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?style=flat&logo=jsonwebtokens)](https://jwt.io)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## Overview

**HireFlow** is a modern, full-stack job portal that connects **candidates** and **recruiters** on a single platform. Candidates can browse and apply for jobs, manage their profile, upload resumes, and track applications. Recruiters can post jobs, review applicants, and manage their listings — all with a clean, responsive UI.

---

## ✨ Features

### For Candidates
- 🔐 Register & login (JWT-based authentication)
- 🔍 Search & filter jobs by title, company, location, type, and experience level
- 📄 Apply to jobs with one click
- 👤 Full profile with profile picture, bio, skills, experience, resume upload
- 📊 Track application statuses (Pending / Accepted / Rejected)

### For Recruiters
- 📝 Post, edit, and delete job listings
- 👥 View applicants per job with rich profile cards
- 🔎 Search applicants by name, skills, city, or headline
- 📁 View applicant profile and download their resume
- ✅ Accept or reject applications

### Platform
- 🌙 Modern, responsive Tailwind CSS UI
- 🔒 Role-based access control (Candidate / Recruiter)
- 📁 File upload support for resumes and profile pictures
- ⚡ Real-time search with debouncing (no page reloads)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Django 6, Django REST Framework 3.17 |
| **Auth** | SimpleJWT (access + refresh tokens, blacklist on logout) |
| **Database** | SQLite (dev) / PostgreSQL (prod) |
| **Frontend** | React 18, Vite 5 |
| **Styling** | Tailwind CSS 4 |
| **HTTP Client** | Axios |
| **Routing** | React Router v6 |
| **File Storage** | Django FileField / ImageField (local media) |
| **Containerisation** | Docker + Docker Compose |

---

## 📁 Project Structure

```
hireflow/
├── hireflow-backend/          # Django REST API
│   ├── apps/
│   │   ├── authentication/    # JWT login, register, logout, token refresh
│   │   ├── users/             # User model, profile (GET/PATCH /api/users/me/)
│   │   ├── jobs/              # Job CRUD, search & filter
│   │   └── applications/      # Application create, status update, applicant list
│   ├── config/                # Django settings, root URLs
│   ├── requirements/
│   │   └── base.txt
│   ├── .env.example
│   └── manage.py
│
├── hireflow-frontend/         # React + Vite SPA
│   ├── src/
│   │   ├── api/               # Axios API helpers (client, jobs, recruiter, users)
│   │   ├── components/        # Navbar, Footer, JobCard
│   │   ├── context/           # Auth context
│   │   ├── pages/             # All page components
│   │   ├── routes/            # ProtectedRoute, RecruiterRoute, CandidateRoute
│   │   └── utils/             # mediaUrl helper
│   └── index.html
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Python | 3.11+ |
| Node.js | 18+ |
| npm | 9+ |
| Git | Any |

---

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/hireflow.git
cd hireflow/hireflow-backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements/base.txt
pip install Pillow               # required for ImageField

# 4. Copy and fill in your environment variables
cp .env.example .env
# Edit .env with your SECRET_KEY (see Environment Variables below)

# 5. Apply migrations
python manage.py migrate

# 6. (Optional) Create a superuser for the admin panel
python manage.py createsuperuser

# 7. Start the development server
python manage.py runserver
```

> The Django API will be available at **http://127.0.0.1:8000**

---

### Frontend Setup

```bash
# From the project root
cd hireflow-frontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

> The React app will be available at **http://localhost:5173**

---

## 🔑 Environment Variables

Create `hireflow-backend/.env` by copying `.env.example`:

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database (leave defaults for SQLite dev setup)
DB_NAME=hireflow_db
DB_USER=hireflow_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

> **Never commit your `.env` file.** It is already listed in `.gitignore`.

To generate a secure Django secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 📡 API Endpoints

### Authentication — `/api/auth/`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/login/` | Login, returns access + refresh tokens |
| POST | `/api/auth/logout/` | Logout (blacklists refresh token) |
| POST | `/api/auth/token/refresh/` | Refresh access token |

### Users — `/api/users/`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/users/me/` | ✅ | Get own full profile |
| PATCH | `/api/users/me/` | ✅ | Update own profile (multipart) |
| GET | `/api/users/<id>/` | ✅ | Get any candidate's public profile |

### Jobs — `/api/jobs/`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/jobs/` | ❌ | List all active jobs (supports `?search`, `?location`, `?type`, `?experience`) |
| POST | `/api/jobs/` | Recruiter | Create a job |
| GET | `/api/jobs/<id>/` | ❌ | Get job detail |
| PUT/PATCH | `/api/jobs/<id>/` | Owner | Update job |
| DELETE | `/api/jobs/<id>/` | Owner | Delete job |
| GET | `/api/jobs/my/` | Recruiter | Get own jobs |

### Applications — `/api/applications/`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/applications/` | Candidate | Apply to a job |
| GET | `/api/applications/my/` | Candidate | Get own applications |
| GET | `/api/applications/check/?job=<id>` | Candidate | Check if already applied |
| GET | `/api/applications/applicants/?job=<id>` | Recruiter | List applicants (supports `?search`) |
| PATCH | `/api/applications/<id>/status/` | Recruiter | Accept / Reject |

---

## 🐳 Running with Docker

```bash
# From the project root
docker-compose up --build
```

> Requires Docker and Docker Compose installed.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ by <strong>Runal Gurnule</strong>
</div>
