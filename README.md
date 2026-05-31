# CareerFlow - Online Learning Course Recommendation Platform

A full-stack MERN learning platform where users can discover courses, enroll, track lesson progress, and get personalized recommendations.

## Features

- JWT-based authentication (register, login, profile)
- Course catalog with filtering, sorting, pagination, and featured courses
- Enrollment system with duplicate-enrollment protection
- Progress tracking with completion percentage and time spent
- Gamification with points, streaks, and leaderboard
- Personalized recommendation engine based on interests, skills, and level
- Dashboard-ready summary APIs for learner analytics

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- Framer Motion
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs

## Project Structure

```text
Project-2/
  client/   # React frontend
  server/   # Express + MongoDB backend
  docs/     # project notes and interview prep docs
```

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- MongoDB (local or Atlas)

## Environment Variables

Create a `.env` file in `server/`:

```env
MONGO_URI=mongodb://localhost:27017/careerflow
JWT_SECRET=your_super_secret_key
PORT=5001
CLIENT_URL=http://localhost:3000
```

Notes:
- `PORT=5001` is recommended because the frontend proxy points to `http://localhost:5001`.
- If you use MongoDB Atlas, set `MONGO_URI` to your Atlas connection string.

Optional: create `client/.env` only if needed.

```env
REACT_APP_API_URL=/api
```

## Installation

From the project root:

```bash
cd server
npm install

cd ../client
npm install
```

## Run the App (Development)

Use two terminals.

Terminal 1 - backend:

```bash
cd server
npm run dev
```

Terminal 2 - frontend:

```bash
cd client
npm start
```

App URLs:
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:5001/api/health`

## Seed Sample Data

The backend seeds courses automatically on startup when the course collection is empty.

You can also seed manually:

```bash
cd server
npm run seed
```

Demo user created by seeder:
- Email: `demo@careerflow.com`
- Password: `demo1234`

## API Overview

Base URL: `/api`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)
- `PUT /auth/profile` (protected)

### Courses
- `GET /courses`
- `GET /courses/featured`
- `GET /courses/:id`
- `POST /courses` (protected, admin only)

Supported query params for `GET /courses`:
- `category`
- `level`
- `search`
- `sort` (`popular`, `rating`, `newest`, `price`)
- `page`
- `limit`

### Enrollments
- `POST /enrollments/:courseId` (protected)
- `GET /enrollments/my` (protected)
- `GET /enrollments/check/:courseId` (protected)

### Progress
- `GET /progress/summary` (protected)
- `GET /progress/:courseId` (protected)
- `PUT /progress/:courseId` (protected)

### Recommendations
- `GET /recommendations` (protected)

### Users
- `GET /users/leaderboard` (protected)

## Recommendation Logic (High Level)

Each unenrolled course is scored using:
- Interest/category/tag match
- Skill/tag overlap
- Level match
- Popularity and rating boosts
- Featured-course boost

Top-ranked courses are returned, along with trending and category-based suggestions.

## Available Scripts

### server/package.json
- `npm start` - run backend with Node
- `npm run dev` - run backend with nodemon
- `npm run seed` - seed sample courses and demo user

### client/package.json
- `npm start` - run frontend development server
- `npm run build` - create production build

## License

This project is licensed under the terms in the `LICENSE` file.