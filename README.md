# Notes App

A full-stack notes application featuring a RESTful API backend with Node.js and a simple frontend built with vanilla HTML, CSS, and JavaScript. The application allows users to register, log in, and perform CRUD (Create, Read, Update, Delete) operations on their notes.

## Features

*   **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
*   **RESTful API**: A well-structured backend API for managing users and notes.
*   **CRUD Operations**: Users can create, view, update, and delete their personal notes.
*   **Data Persistence**: Uses Sequelize ORM with SQLite for easy setup, and supports MySQL.
*   **Responsive UI**: A clean and simple user interface built with Bootstrap.
*   **Testing**: Includes unit and integration tests written with Jest and Supertest.

## Tech Stack

*   **Backend**: Node.js, Express.js, Sequelize, JWT, bcryptjs
*   **Database**: SQLite (default), MySQL
*   **Frontend**: HTML, CSS, JavaScript, Bootstrap
*   **Testing**: Jest, Supertest

## Architecture & Design Decisions

This project follows a strict **3-Layer Architecture** to ensure separation of concerns:

- **Repository Pattern**: Used to decouple the database logic (Sequelize) from the business logic. This makes the code easier to test using mocks and allows for easier database migrations in the future.
- **Service Layer**: Contains all business rules (e.g., checking note ownership, password validation). This ensures that the controllers remain "thin" and focused only on HTTP handling.
- **ORM (Sequelize)**: Chosen to provide high-level abstraction for database operations, protecting against SQL injection and simplifying data relationships.

## Data Model

The application uses a **One-to-Many (1:N)** relationship between Users and Notes.

## Project Structure

The repository is structured to separate concerns, making it maintainable and scalable.

```
.
├── public/                 # Frontend static files (HTML, CSS, JS)
├── src/
│   ├── config/             # Database configuration (Sequelize)
│   ├── controllers/        # Express route handlers
│   ├── errors/             # Custom error classes
│   ├── middlewares/        # Custom Express middlewares (e.g., auth)
│   ├── models/             # Sequelize data models
│   ├── repositories/       # Data access layer abstracting database queries
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic
│   ├── tests/              # Unit and integration tests
│   ├── app.js              # Express app configuration
│   └── server.js           # Server entry point
├── .env.example            # Environment variable template
├── database.sqlite         # Default SQLite database file
└── package.json            # Project dependencies and scripts
```

## Getting Started

### Prerequisites

*   Node.js (v14 or later)
*   npm

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/egertl123/notes-app.git
    cd notes-app
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```

    The application is configured to use **SQLite** by default, which requires no extra setup. The `database.sqlite` file will be created automatically.

    To use **MySQL**, update the `.env` file with your database credentials and set `DB_DIALECT=mysql`.
    ```env
    # .env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=notes_app
    DB_DIALECT=mysql
    JWT_SECRET=a_very_long_and_random_secret_string
    PORT=3000
    ```

4.  **Start the server:**
    ```sh
    npm start
    ```

    The application will be running at `http://localhost:3000`.

## API Endpoints

All note-related endpoints require an `Authorization: Bearer <token>` header.

### Auth

*   **`POST /api/auth/signup`**: Register a new user.
    *   **Body**: `{ "email": "user@example.com", "password": "yourpassword" }`

*   **`POST /api/auth/login`**: Log in an existing user.
    *   **Body**: `{ "email": "user@example.com", "password": "yourpassword" }`
    *   **Returns**: `{ "token": "...", "user": { ... } }`

### Notes

*   **`GET /api/notes`**: Get all notes for the authenticated user.

*   **`POST /api/notes`**: Create a new note.
    *   **Body**: `{ "title": "My Note", "content": "Note details here." }`

*   **`PUT /api/notes/:id`**: Update an existing note by its ID.
    *   **Body**: `{ "title": "Updated Title", "content": "Updated content." }`

*   **`DELETE /api/notes/:id`**: Delete a note by its ID.

## Running Tests

To run the integration and unit tests, use the following command:

```sh
npx jest
