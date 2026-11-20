# FoundIt - Lost and Found Platform

## About the Project

FoundIt is a web application that helps people report lost belongings and find items that have been found by other people.

Users can browse lost and found reports, submit claims for their belongings, and receive notifications. Administrators can manage users, reports and claims.

## Features

- User registration and login
- Session-based authentication
- Browse lost and found items
- Search items
- Filter items by category and type
- View item details
- Report lost items
- Report found items
- Submit claims for found items
- View personal reports
- View personal claims
- Receive and manage notifications
- User profile page
- Admin dashboard
- Manage users and reports
- Approve or reject claims
- Manage item handovers

## Technologies Used

- React
- Vite
- JavaScript
- Tailwind CSS
- CSS
- React Router
- Lucide React
- Fetch API

## Backend

The frontend connects to the FoundIt Flask backend.

API URL:

https://foundit-backend-1c64.onrender.com

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/imranosman886-beep/Found-it-frontend2.git
```

### 2. Open the project

```bash
cd Found-it-frontend2
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create an environment file

Create a `.env` file in the root folder and add:

```env
VITE_API_BASE_URL=https://foundit-backend-1c64.onrender.com
```

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

http://localhost:5173

## Build for Production

To create a production build, run:

```bash
npm run build
```

## Project Structure

```text
src/
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── services/
├── tests/
├── utils/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Authentication

FoundIt uses session-based authentication. The frontend includes credentials with API requests so that users can stay logged in while navigating the application.

## Contributors

Developed as a group project.

## License

This project was created for educational purposes.
