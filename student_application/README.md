# Student Application Management System

Single-page web application built with React, Vite, React Router, and Tailwind CSS. It lets a single admin user manage student applications with full CRUD.

## Features

- **Admin authentication**
  - Single admin (`admin` / `admin123`)
  - Login page with validation and error messages
  - Session persisted securely in `localStorage`
  - Logout clears session and blocks access to admin pages

- **Protected admin area**
  - All student management pages are protected routes
  - Unauthenticated users are always redirected to the login page

- **Student management (CRUD)**
  - Add student (Full Name, Email, Course Name; Created Date auto-generated)
  - View student list in a table on the dashboard
  - View student details on a dedicated page
  - Edit student with prefilled form
  - Delete student with confirmation screen
  - Success / error messages for all operations

- **UI**
  - Clean, modern layout using Tailwind CSS
  - Separate screens for Login, Dashboard, Student Form, and Student Details

## Tech Stack

- React + Vite
- React Router
- Tailwind CSS (with custom `primary` color and Outfit font)
- `localStorage` for simple persistent data storage

## Installation

```bash
npm install
```

If you have not yet installed Tailwind tooling:

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Running the app

```bash
npm run dev
```

Open the URL shown in the terminal (typically http://localhost:5173).

## Login credentials

- **Username:** `admin`
- **Password:** `admin123`

These are configured in `src/context/AuthContext.jsx`.

## Application structure

- `src/main.jsx` – React root, wraps app in `BrowserRouter`.
- `src/App.jsx` – Defines routes and wraps everything in providers.
- `src/context/AuthContext.jsx` – Admin auth, login/logout, session persistence.
- `src/context/StudentsContext.jsx` – Student CRUD and `localStorage` syncing.
- `src/components/ProtectedRoute.jsx` – Guards admin routes.
- `src/components/Layout.jsx` – Shared admin layout (header, actions, logout).
- `src/pages/LoginPage.jsx` – Admin login page.
- `src/pages/DashboardPage.jsx` – Student table with actions.
- `src/pages/StudentFormPage.jsx` – Add / Edit student form.
- `src/pages/StudentDetailsPage.jsx` – Clean student details view.
- `src/pages/StudentDeletePage.jsx` – Delete confirmation screen.

## Data storage ("database")

For simplicity, this project uses `localStorage` instead of a real database. You can later replace it with an API/backend.

### Admin session

- **Key:** `admin_session`
- **Shape:**

```json
{
  "username": "admin"
}
```

Stored and read in `src/context/AuthContext.jsx`.

### Students

- **Key:** `students`
- **Shape:** array of objects

```json
[
  {
    "id": "uuid-string",
    "fullName": "John Doe",
    "email": "john@example.com",
    "courseName": "Computer Science",
    "createdAt": "2025-01-01T10:00:00.000Z"
  }
]
```

Managed in `src/context/StudentsContext.jsx`.

## Production readiness notes

- To make this production-grade, you would typically:
  - Replace `localStorage` with a real backend (REST/GraphQL + database).
  - Implement secure authentication and authorization on the server.
  - Add form validations and error handling around network requests.
  - Add tests and CI/CD pipeline.

The current implementation is fully functional as a front-end SPA and can be pointed at a backend later.

