# 📋 CareerFlow — Interview Prep & GitHub Guide

---

## 🐙 GitHub Upload Steps

### 1. Create Repository
- Go to github.com → New Repository
- **Name:** `CareerFlow-Course-Recommendation-Platform`
- **Description:** Full-stack MERN EdTech platform with AI-powered course recommendations, progress tracking, and gamification
- Visibility: Public
- ✅ Add README (we already have one)

### 2. Push Code
```bash
cd CareerFlow
git init
git add .
git commit -m "feat: initial full-stack CareerFlow platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/CareerFlow-Course-Recommendation-Platform.git
git push -u origin main
```

### 3. Day-wise Commits (Proof of Work)

| Day | What to commit | Commit message |
|---|---|---|
| Day 1 | React setup, routing, CSS theme | `feat: setup React frontend with dark theme and routing` |
| Day 2 | Express server, CORS, health route | `feat: initialize Express backend with middleware` |
| Day 3 | All Mongoose models | `feat: add User, Course, Enrollment, Progress schemas` |
| Day 4 | Auth routes + JWT middleware | `feat: implement JWT authentication and auth routes` |
| Day 5 | Course CRUD + seeder (20 courses) | `feat: add course catalog API and seed 20 courses` |
| Day 6 | Recommendation engine | `feat: build multi-factor course recommendation engine` |
| Day 7 | Enrollment + Progress tracking | `feat: add enrollment, lesson completion, progress API` |
| Day 8 | Dashboard charts, README, polish | `docs: complete README, add dashboard charts and gamification` |

### 4. GitHub Tags to Add
`mern` `react` `nodejs` `mongodb` `edtech` `recommendation-system` `full-stack` `jwt`

### 5. Never Upload
- `.env` file (add to .gitignore)
- `node_modules/`
- Use `.env.example` instead

---

## 📸 Screenshots to Capture

1. **Register page** — show interest chip selection
2. **Login page** — with demo account button
3. **Dashboard** — full view with charts and stats
4. **Course Listing** — filters and grid layout
5. **Course Detail** — curriculum with lesson completion
6. **Recommendations page** — with reason badges
7. **My Learning** — with progress bars
8. **Profile page** — interests and skills chips
9. **MongoDB Compass** — show collections
10. **Postman/Thunder Client** — show API response for /recommendations

---

## 💼 Interview Preparation

---

### Q1: Explain your project.

**HR Answer:**
"I built CareerFlow, a full-stack EdTech platform similar to Udemy or Coursera. Learners can browse 20+ courses, enroll, track their progress lesson by lesson, and receive personalized course recommendations. I added gamification features like points, streaks, and a leaderboard to keep users engaged. It's built with the MERN stack — MongoDB, Express, React, and Node.js."

**Technical Answer:**
"CareerFlow is a full-stack MERN application. The backend is an Express REST API with JWT authentication. MongoDB stores users, courses, enrollments, and progress using Mongoose schemas with compound indexes. The recommendation engine scores each unenrolled course by matching user interests (+30), skill tags (+20), experience level (+25), popularity, and rating — then sorts and returns the top 8. The React frontend uses Context API for auth state, Axios with an interceptor for token injection, and Recharts for dashboard visualizations."

---

### Q2: How does your recommendation engine work?

"It's a content-based filtering system. For each unenrolled course, I compute a score: interest overlap × 30 + skill overlap × 20 + level match × 25 + normalized popularity + rating boost + featured flag. Already-enrolled courses are excluded via a MongoDB $nin query. The result is sorted descending and sliced to top 8. I also return trending courses by enrolledCount and category-based suggestions using the user's most-enrolled category."

---

### Q3: How does JWT authentication work in your app?

"When a user logs in, the server verifies the password using bcryptjs compare, then signs a JWT with the user's ID and a secret key. The token is returned to the frontend and stored in localStorage. Every API request uses an Axios request interceptor to attach the token in the Authorization header as 'Bearer token'. On the backend, a protect middleware verifies the token using jwt.verify, finds the user by ID, and attaches it to req.user."

---

### Q4: How did you design your MongoDB schemas?

"I have 4 collections. User stores name, email, hashed password, interests, skills, level, streak, and totalPoints. Course stores catalog data with tags, category, level, and lessons array. Enrollment maps user to course with status (active/completed). Progress tracks completedLessons array, progressPercent, and timeSpent. I used compound indexes on Enrollment and Progress (user+course) to prevent duplicates and speed up lookups."

---

### Q5: What is the difference between authentication and authorization?

"Authentication verifies who you are — done at login with email and password. Authorization verifies what you're allowed to do — in my app, the protect middleware checks if you have a valid JWT, and the adminOnly middleware checks if your role is 'admin' before allowing course creation."

---

### Q6: How does progress tracking work?

"When a learner clicks 'Complete' on a lesson, the frontend calls PUT /api/progress/:courseId with the lessonIndex and timeSpent. The backend adds the lesson index to the completedLessons array if not already there, recalculates progressPercent as (completedLessons.length / totalLessons) × 100, and awards 5 points. If progress reaches 100%, the enrollment status changes to 'completed', a certificate is unlocked, and a 100-point bonus is awarded."

---

### Q7: Why did you use React Context API instead of Redux?

"For this project scale, Context API is sufficient. I have a single AuthContext that stores user state, token management, and auth functions. Redux adds significant boilerplate for cases where you have global state that many unrelated components need to subscribe to with complex update logic — Context is simpler and built into React. If this app grew to need shopping carts, multi-step forms, or real-time data, I'd consider Redux Toolkit."

---

### Q8: How did you handle API errors in your frontend?

"I configured an Axios response interceptor that catches all errors globally. For 401 Unauthorized errors — which mean the token expired — it automatically clears localStorage and redirects to /login. For other errors, each component catches them in try/catch blocks and shows an error message in an alert div. The interceptor pattern prevents me from duplicating error handling in every API call."

---

### Q9: How would you scale this application?

"For scaling, I'd: (1) Move to MongoDB Atlas for managed cloud DB with replication. (2) Add Redis caching for recommendations, which don't need to recalculate on every request. (3) Use Cloudinary or AWS S3 for course thumbnails and videos instead of URLs. (4) Add rate limiting with express-rate-limit to prevent API abuse. (5) Containerize with Docker and deploy on AWS ECS or Kubernetes for horizontal scaling. (6) Replace simple recommendation scoring with collaborative filtering using a Python ML microservice."

---

### Q10: What was the hardest part of building this?

"The recommendation engine was the most intellectually challenging. I had to design a scoring system that felt genuinely personalized — balancing multiple signals (interest, skill, level, popularity, rating) without any one factor dominating. I also had to ensure already-enrolled courses were excluded efficiently using MongoDB's $nin operator. Getting the weights right so beginner-appropriate courses scored higher for beginner users than advanced courses, even if the advanced course had more enrollments, required careful testing."

---

## 🏷 Best GitHub Repo Names

1. `CareerFlow-Course-Recommendation-Platform` ✅ (recommended)
2. `MERN-EdTech-Learning-Platform`
3. `Online-Learning-Recommendation-System`

## 📝 Repository Description
> Full-stack MERN EdTech platform with personalized course recommendations, JWT auth, progress tracking, gamification (points/streaks/leaderboard), and an advanced dashboard with Recharts visualizations.
