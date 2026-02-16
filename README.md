
MERN Stack Full-Stack Application

Project Overview

This project is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application demonstrates complete frontend and backend integration, RESTful API development, user authentication, and database connectivity.

The project also integrates static code analysis using SonarQube (SonarCloud) to evaluate code quality, maintainability, reliability, and security.


Technology Stack

Frontend

* React.js
* React Router
* Axios
* Tailwind

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt (for password hashing)
* dotenv (for environment configuration)

Code Quality & DevOps

* GitHub
* GitHub Actions
* SonarQube / SonarCloud



Project Architecture

The application follows a client-server architecture:

Frontend (React)
⬇
Backend (Node.js + Express REST API)
⬇
MongoDB Database

The frontend communicates with the backend via RESTful APIs. The backend processes requests, interacts with the database, and returns JSON responses.



Folder Structure

project-root/

backend/

* controllers/ (Business logic)
* models/ (Mongoose schemas)
* routes/ (API routes)
* middleware/ (Authentication & error handling)
* server.js (Entry point)

frontend/

* src/
* components/
* pages/
* App.js



## Backend Setup Instructions

1. Navigate to backend folder:
   npm install

2. Create a .env file with:

   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

3. Start backend server:
   npm start

The backend runs locally on:
[http://localhost:5000](http://localhost:5000)



Frontend Setup Instructions

1. Navigate to frontend folder:
   npm install

2. Start the frontend:
   npm start

The frontend runs locally on:
[http://localhost:3000](http://localhost:3000)


## API Endpoints (Example)

Authentication:

* POST /api/auth/register – Register new user
* POST /api/auth/login – Login user

Users:

* GET /api/user – Retrieve user
* POST /api/user/update - Update user

Notes / Data:

* GET /api/notes/get – Retrieve data
* POST /api/notes/create – Create new entry
* GET /api/notes/get/:id – Update entry
* POST /api/notes/update/:id – Update entry
* POST /api/notes/delete/:id – Delete entry



## Features

* User registration and login
* JWT-based authentication
* Protected routes
* CRUD operations
* RESTful API design
* Database integration using MongoDB
* Password hashing using bcrypt
* Environment-based configuration


## SonarQube Integration

The project integrates SonarQube analysis using GitHub Actions CI pipeline.

The SonarQube analysis evaluates:

* Security vulnerabilities
* Code reliability (bugs)
* Maintainability (code smells)
* Code duplication
* Code coverage (if configured)

The analysis helps identify potential improvements in code quality and ensures better maintainability of the project.

---

## Code Quality Summary (Based on Sonar Analysis)

* Security issues detected
* Reliability issues detected
* Maintainability rating: High
* Low code duplication
* Static code analysis successfully integrated


## Testing

Unit testing can be performed using Jest (if configured).

Run tests using:
npm test

Coverage can be generated using:
npm run test -- --coverage


## Conclusion

This project demonstrates the implementation of a complete MERN stack application with proper separation of concerns between frontend and backend. It includes authentication, database integration, RESTful APIs, and static code analysis using SonarQube to ensure code quality and maintainability.

The integration of SonarQube showcases continuous code quality monitoring as part of modern DevOps practices.
