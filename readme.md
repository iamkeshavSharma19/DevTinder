# 🚀 DevTinder

### A Full-Stack Developer Networking & Connection Platform

DevTinder is a full-stack web application designed to help developers discover, connect, and build professional relationships with other developers.

The platform follows a **Tinder-inspired connection model** where users can discover developer profiles, express interest or ignore profiles, manage incoming connection requests, and maintain their professional developer network.

Built with the **MERN stack**, DevTinder demonstrates real-world implementation of authentication, REST APIs, MongoDB data modeling, protected routes, Redux state management, API integration, profile management, and connection workflows.

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Application Architecture](#-application-architecture)
* [Project Structure](#-project-structure)
* [Frontend Architecture](#-frontend-architecture)
* [Backend Architecture](#-backend-architecture)
* [Authentication Flow](#-authentication-flow)
* [Connection System](#-connection-system)
* [Database Design](#-database-design)
* [API Reference](#-api-reference)
* [State Management](#-state-management)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Available Scripts](#-available-scripts)
* [Application Flow](#-application-flow)
* [Validation & Security](#-validation--security)
* [Future Improvements](#-future-improvements)
* [Learning Outcomes](#-learning-outcomes)
* [Author](#-author)

---

# 🌟 Overview

DevTinder solves a simple problem:

> **Finding other developers to connect, collaborate, and grow with should be easier.**

Instead of browsing generic social profiles, DevTinder focuses specifically on developers and their technical identities.

A user can:

1. Create an account
2. Log in securely
3. Maintain a developer profile
4. Discover other developers through a personalized feed
5. Express interest in another developer
6. Ignore profiles they are not interested in
7. Receive connection requests
8. Accept or reject requests
9. View their existing connections
10. Edit their profile information

The project is divided into two independently maintainable applications:

```text
DevTinder
│
├── Frontend
│   └── React + Vite
│
└── backend
    └── Node.js + Express + MongoDB
```

---

# ✨ Features

## 🔐 Authentication

DevTinder provides a complete basic authentication workflow.

### Signup

Users can create an account using:

* First name
* Last name
* Email
* Password

Passwords are hashed using `bcrypt` before being stored in MongoDB.

### Login

Users authenticate using their email and password.

After successful authentication:

```text
User Credentials
       ↓
Validate User
       ↓
Compare Password
       ↓
Generate JWT
       ↓
Store JWT in Cookie
       ↓
Authenticated Session
```

### Logout

The authentication cookie is cleared when the user logs out.

---

# 👤 Developer Profiles

Users have customizable developer profiles containing information such as:

* First name
* Last name
* Age
* Gender
* Email
* Profile photo
* About section
* Technical skills

The profile can be viewed and edited after authentication.

Example developer profile:

```text
┌───────────────────────────────┐
│          Profile              │
│                               │
│        👨‍💻 Developer           │
│                               │
│  Name: Keshav Sharma          │
│  Age: 22                      │
│  Skills: React, Node, MongoDB │
│                               │
│  About: Full Stack Developer  │
│                               │
│       [ Edit Profile ]        │
└───────────────────────────────┘
```

---

# 🎯 Developer Feed

The Feed is one of the core features of DevTinder.

Authenticated users can discover other developers through a feed of profile cards.

The feed allows users to decide whether they are interested in connecting with another developer.

Conceptually:

```text
                Developer Feed
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
      Interested                Ignore
          │                       │
          ↓                       ↓
 Connection Request          Ignore User
```

The backend feed API is responsible for returning developer profiles that can be considered for connection.

---

# 🤝 Connection Request System

DevTinder implements a connection-request workflow instead of immediately creating a connection.

A request can move through several states:

```text
ignored
interested
accepted
rejected
```

### Connection lifecycle

```text
Developer A
     │
     │ Send Interest
     ↓
Connection Request
     │
     ↓
Developer B
     │
     ├── Accept ──→ Connection
     │
     └── Reject ──→ Rejected Request
```

This creates a more realistic networking workflow than simply adding users to a connection list.

---

# 👥 Connections

Once a connection request has been accepted, the connected developers can be viewed from the Connections page.

The frontend provides a dedicated Connections screen for displaying the user's network.

---

# 📩 Connection Requests

Users can view incoming connection requests separately from their existing connections.

Available actions include:

* Accept request
* Reject request

This separation keeps:

```text
Connections
```

and

```text
Pending Requests
```

as independent concepts in the application.

---

# 🛠 Tech Stack

## Frontend

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| React          | UI development              |
| Vite           | Frontend build tool         |
| React Router   | Client-side routing         |
| Redux Toolkit  | Global state management     |
| React Redux    | Connecting Redux with React |
| Axios          | HTTP/API communication      |
| Tailwind CSS   | Styling                     |
| DaisyUI        | UI components               |
| React Toastify | Toast notifications         |
| Lucide React   | Icons                       |

---

## Backend

| Technology    | Purpose                        |
| ------------- | ------------------------------ |
| Node.js       | JavaScript runtime             |
| Express.js    | REST API framework             |
| MongoDB       | Database                       |
| Mongoose      | MongoDB ODM                    |
| JWT           | Authentication                 |
| bcrypt        | Password hashing               |
| cookie-parser | Authentication cookie handling |
| CORS          | Cross-origin requests          |
| dotenv        | Environment configuration      |
| validator     | Input validation               |

---

# 🏗 Application Architecture

DevTinder follows a client-server architecture.

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                         HTTP / Axios
                               │
                               ↓
                    ┌──────────────────────┐
                    │    Express Server    │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ↓                      ↓
              Route Handlers          Middleware
                    │                      │
                    └──────────┬───────────┘
                               ↓
                    ┌──────────────────────┐
                    │      Mongoose        │
                    │       Models         │
                    └──────────┬───────────┘
                               ↓
                    ┌──────────────────────┐
                    │       MongoDB        │
                    └──────────────────────┘
```

---

# 📁 Project Structure

```text
DevTinder/
│
├── Frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Body.jsx
│   │   │   ├── Connections.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── FeaturesGridSection.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ImageCard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MentorsSection.jsx
│   │   │   ├── NavItem.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Requests.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   └── UserCard.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── appStore.js
│   │   │   ├── connectionSlice.js
│   │   │   ├── constants.js
│   │   │   ├── feedSlice.js
│   │   │   ├── requestSlice.js
│   │   │   └── userSlice.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── middlewares/
│   │   │   └── auth.js
│   │   │
│   │   ├── models/
│   │   │   ├── connectionRequests.js
│   │   │   └── user.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── profile.js
│   │   │   ├── request.js
│   │   │   └── user.js
│   │   │
│   │   ├── utils/
│   │   │   └── validation.js
│   │   │
│   │   ├── Pagination.js
│   │   └── app.js
│   │
│   ├── apiList.md
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# 🎨 Frontend Architecture

The frontend follows a component-based React architecture.

## Main Components

### `App.jsx`

Acts as the main application entry point and coordinates the application routing/layout.

### `Navbar.jsx`

Provides navigation across the application.

### `Body.jsx`

Acts as the routing/layout layer and uses React Router's nested routing mechanism.

### `Login.jsx`

Handles user authentication.

### `Signup.jsx`

Handles new user registration.

### `Feed.jsx`

Displays developer profiles that can be considered for connection.

### `UserCard.jsx`

Represents an individual developer profile in the feed.

### `Profile.jsx`

Displays the authenticated user's profile.

### `EditProfile.jsx`

Allows the user to update profile information.

### `Connections.jsx`

Displays accepted developer connections.

### `Requests.jsx`

Displays received connection requests and allows the user to accept/reject them.

---

# 🧠 Redux State Management

DevTinder uses Redux Toolkit for centralized application state.

The Redux store contains four primary slices:

```text
Redux Store
│
├── user
├── feed
├── connections
└── requests
```

## User State

Responsible for the currently authenticated user's information.

```text
userSlice
    ↓
Authenticated User
    ↓
Navbar / Profile / Protected UI
```

## Feed State

Stores developer profiles retrieved from the backend feed API.

```text
API
 ↓
Feed Data
 ↓
feedSlice
 ↓
Feed Component
```

## Connections State

Stores the user's accepted connections.

## Requests State

Stores incoming connection requests.

This architecture avoids passing large amounts of authentication and application data through deeply nested React props.

---

# 🔒 Protected Routes

DevTinder prevents unauthenticated users from accessing protected application areas.

The basic flow is:

```text
User opens protected route
          │
          ↓
Authentication state checked
          │
      ┌───┴───┐
      ↓       ↓
   Logged    Not Logged
    In          In
      │           │
      ↓           ↓
   Continue     Login
```

The frontend authentication state is synchronized with the backend session.

---

# 🔑 Authentication Architecture

Authentication uses JWT-based sessions.

### Login Flow

```text
React Login Form
       │
       ↓
Axios Request
       │
       ↓
POST /login
       │
       ↓
Find User
       │
       ↓
bcrypt.compare()
       │
       ↓
Generate JWT
       │
       ↓
HTTP Cookie
       │
       ↓
Authenticated User
```

JWT tokens contain the user's MongoDB `_id`.

The token is configured with a one-day JWT expiration in the user model.

---

# 🗄 Database Design

DevTinder currently uses two primary MongoDB collections/models.

## User

The User model contains:

```text
User
│
├── firstName
├── lastName
├── password
├── age
├── gender
├── emailId
├── photoUrl
├── about
├── skills
├── createdAt
└── updatedAt
```

### Validation

The schema includes validation for:

* Required first name
* Required password
* Strong password validation
* Valid email address
* Unique email
* Gender enum
* Minimum age
* Valid profile image URL

---

# 🔗 ConnectionRequest

Connection requests use a separate model.

```text
ConnectionRequest
│
├── fromUserId
├── toUserId
├── status
├── createdAt
└── updatedAt
```

### Status values

```text
ignored
interested
accepted
rejected
```

The model uses MongoDB references to connect both users.

A compound index is also defined on:

```text
fromUserId + toUserId
```

The model additionally prevents a user from sending a connection request to themselves.

---

# 🔌 API Reference

All backend routes are currently mounted from the root application.

## Authentication APIs

### Signup

```http
POST /signup
```

Creates a new user account.

### Login

```http
POST /login
```

Authenticates an existing user.

### Logout

```http
POST /logout
```

Clears the authentication cookie.

---

# 👤 Profile APIs

### View Profile

```http
GET /profile/view
```

Returns the authenticated user's profile.

### Edit Profile

```http
PATCH /profile/edit
```

Updates editable profile information.

### Update Password

```http
PATCH /profile/password
```

Handles password-related profile updates.

---

# 🤝 Connection Request APIs

### Send Connection Request

```http
POST /request/send/status/:userId
```

The request status can represent:

```text
interested
ignored
```

Example:

```http
POST /request/send/interested/64abc123...
```

---

### Review Connection Request

```http
POST /request/review/:status/:requestId
```

Possible review statuses include:

```text
accepted
rejected
```

Example:

```http
POST /request/review/accepted/64abc123...
```

---

# 👥 User APIs

### Get Connections

```http
GET /user/connections
```

Returns the authenticated user's accepted connections.

### Get Received Requests

```http
GET /user/requests/received
```

Returns incoming connection requests.

### Get Feed

```http
GET /user/feed
```

Returns developer profiles available for discovery.

---

# 🔄 Complete Application Flow

A typical user journey looks like this:

```text
                    ┌──────────────┐
                    │   Homepage   │
                    └──────┬───────┘
                           │
                    Login / Signup
                           │
                           ↓
                    ┌──────────────┐
                    │ Authenticated │
                    │     User      │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
            Feed         Profile     Requests
              │            │            │
              ↓            ↓            ↓
        Discover Users   Edit Info   Accept/Reject
              │                         │
              ↓                         ↓
        Interested / Ignore       Connection Created
              │                         │
              └────────────┬────────────┘
                           ↓
                     Connections
```

---

# 🌐 Frontend ↔ Backend Communication

The frontend communicates with the Express backend using Axios.

Authentication requests require credentials so that the browser can send the authentication cookie.

Conceptually:

```javascript
axios({
    url: API_URL,
    method: "POST",
    withCredentials: true
});
```

The backend enables CORS with credentials for the frontend origin.

---

# ⚙️ Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Git

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/iamkeshavSharma19/DevTinder.git

cd DevTinder
```

---

# 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=7777
DB_CONNECTION_SECRET=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:7777
```

---

# 3️⃣ Setup Frontend

Open another terminal:

```bash
cd Frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

## Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=7777

DB_CONNECTION_SECRET=mongodb+srv://<username>:<password>@cluster.mongodb.net/DevTinder

JWT_SECRET=replace_with_a_strong_secret
```

### Important

Never commit your `.env` file or expose:

* MongoDB credentials
* JWT secrets
* API keys
* Production credentials

---

# 📦 Backend Scripts

From `/backend`:

### Development

```bash
npm run dev
```

Starts the Express server using Nodemon.

### Start

```bash
npm start
```

Starts the configured backend command.

### Test

```bash
npm test
```

A test script is currently not implemented.

---

# 📦 Frontend Scripts

From `/Frontend`:

### Development

```bash
npm run dev
```

Starts Vite development server.

### Production Build

```bash
npm run build
```

Creates the production build.

### Preview

```bash
npm run preview
```

Previews the production build locally.

### Lint

```bash
npm run lint
```

Runs ESLint against the frontend source.

---

# 🛡️ Validation & Security

DevTinder implements several basic security practices.

## Password Hashing

Passwords are never intentionally stored as plain text.

```text
Plain Password
      ↓
bcrypt.hash()
      ↓
Password Hash
      ↓
MongoDB
```

During login:

```text
Input Password
      ↓
bcrypt.compare()
      ↓
Stored Hash
      ↓
Valid / Invalid
```

---

## JWT Authentication

The backend generates JWT tokens containing the authenticated user's ID.

The token is stored in an HTTP cookie and used to authenticate protected requests.

---

## Input Validation

The backend uses:

* Mongoose schema validation
* `validator`
* Custom signup validation
* Enum validation
* URL validation
* Email validation
* Password strength validation

---

## CORS

The Express backend is configured to allow requests from the frontend application while supporting credentials.

This is required because authentication relies on cookies.

---

# 📊 Project Architecture at a Glance

```text
                    DEV TINDER
                        │
        ┌───────────────┴────────────────┐
        │                                │
        ↓                                ↓
    FRONTEND                           BACKEND
        │                                │
     React                           Express
        │                                │
      Vite                         Middleware
        │                                │
React Router                         Routes
        │                                │
 Redux Toolkit                       Models
        │                                │
     Axios                          Mongoose
        │                                │
        └──────────── HTTP ──────────────┘
                                         │
                                         ↓
                                     MongoDB
```

---

# 🧪 Testing Status

The repository currently contains the application implementation, but automated end-to-end testing is not yet part of the project.

A useful future testing strategy would include:

### Frontend

* Component testing
* Route testing
* Redux state testing

### Backend

* Authentication tests
* API integration tests
* Validation tests
* Connection request tests

### End-to-End

Example workflow:

```text
Signup
  ↓
Login
  ↓
Feed
  ↓
Send Connection Request
  ↓
Login as Receiver
  ↓
Review Request
  ↓
Accept
  ↓
Verify Connection
```

---

# 🚧 Future Improvements

The current project provides a strong foundation for a developer networking platform.

Potential next features include:

## 💬 Real-Time Chat

Allow connected developers to communicate through real-time messaging.

Possible technology:

```text
Socket.IO
```

---

## 🔔 Notifications

Add notifications for:

* New connection requests
* Accepted requests
* New messages
* Profile interactions

---

## 🔎 Developer Search

Allow developers to search based on:

* Skills
* Experience
* Technology
* Location
* Interests

---

## 🧠 Smart Matching

Introduce a compatibility score based on:

```text
Skills
+
Interests
+
Experience
+
Project Requirements
```

---

## 🧪 Automated Testing

Add:

* Jest
* Supertest
* React Testing Library
* Playwright/Cypress

---

## 🚀 Production Deployment

Deploy frontend and backend independently.

Possible architecture:

```text
             Internet
                 │
        ┌────────┴────────┐
        ↓                 ↓
   React Frontend     Express API
        │                 │
        │                 ↓
        │              MongoDB
        │
        └────── HTTPS ────┘
```

---

# 📚 Learning Outcomes

This project demonstrates practical understanding of several full-stack development concepts.

### Frontend

* React component architecture
* React Router
* Protected routes
* Redux Toolkit
* Global state management
* Axios API integration
* Form handling
* Toast notifications
* Tailwind CSS
* Responsive UI design

### Backend

* Express.js
* REST API development
* Middleware
* MongoDB
* Mongoose schemas
* Model relationships
* JWT authentication
* Cookies
* Password hashing
* Request validation
* API architecture

### Full Stack

Most importantly, DevTinder demonstrates how a React frontend communicates with a Node/Express backend and persists application data using MongoDB.

---

# 💡 Why DevTinder?

Traditional social platforms are not specifically designed around developer networking.

DevTinder focuses on:

```text
Developer
    +
Technical Skills
    +
Professional Profile
    +
Connection Requests
    =
Developer Network
```

The goal is to make discovering relevant developers simpler and more structured.

---

# 👨‍💻 Author

**Keshav Sharma**

B.Tech Computer Science & Engineering

GitHub:

[github.com/iamkeshavSharma19](https://github.com/iamkeshavSharma19)

Project:

[DevTinder](https://github.com/iamkeshavSharma19/DevTinder)

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is currently intended primarily as a learning and portfolio project.

Check the repository for the latest licensing information.
