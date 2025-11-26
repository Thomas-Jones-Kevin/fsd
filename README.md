# 📸 EventSnap: Private Event Management System

## Project Overview

EventSnap is a full-stack web application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). It provides a secure platform for authenticated users to **create, view, manage, and track their personal events**.

### Key Features

* **Secure User Authentication:** Login and Registration with JWT authentication.
* **Private Data:** Events are visible and manageable **only** by the user who created them.
* **CRUD Operations:** Full functionality for creating, reading, updating, and deleting events.
* **Modern UI:** Built with React and modern CSS.

***

## ⚙️ Local Development Setup

To get the EventSnap project running locally, you must start the **Backend API** and the **Frontend Client** concurrently.

### Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn
* MongoDB Atlas Account (with a whitelisted IP or set to 'Access from Anywhere')

### 1. Backend Setup

The backend connects the application to MongoDB and manages all API endpoints.

1.  Navigate to the `backend` directory in your terminal:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` directory and add your MongoDB Atlas connection string and JWT secret:
    ```dotenv
    # .env
    MONGODB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/<DATABASE>?retryWrites=true&w=majority"
    JWT_SECRET="YOUR_SUPER_SECRET_KEY"
    ```

4.  **Start the Backend Server:**
    ```bash
    npm run dev
    ```
    *(The server should confirm it's running, typically on port 5000.)*
    **KEEP THIS TERMINAL WINDOW OPEN.**

---

### 2. Frontend Setup

The frontend runs the React application and communicates with the running backend API.

1.  Open a **new terminal window** and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Start the Frontend Client:**
    ```bash
    npm run dev
    ```
    *(The client will open your application in the browser, typically at `http://localhost:5173`.)*

***

## 🚀 Usage

1.  Open your browser to the URL provided by the frontend (e.g., `http://localhost:5173`).
2.  Use the **Register** page to create a new user account.
3.  Log in with your new credentials.
4.  Navigate to the **Dashboard** to view or add your private events!
