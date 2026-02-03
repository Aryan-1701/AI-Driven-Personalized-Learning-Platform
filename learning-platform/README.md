# AI-Driven Personalized Learning Platform

A comprehensive web-based learning platform that uses AI to personalize the educational experience for students and teachers.

## Features

### Frontend
- Beautiful landing page with full platform description
- Login/Signup authentication
- 10 comprehensive modules
- Responsive design
- Modern UI with animations

### Backend
- RESTful API with Express.js
- MongoDB database
- JWT authentication
- All modules fully integrated

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Modern web browser

### Installation

1. **Backend Setup:**
```bash
cd backend
npm install
```

2. **Create `.env` file in backend directory:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-learning-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

3. **Start MongoDB** (make sure MongoDB is running)

4. **Start Backend Server:**
```bash
cd backend
npm run dev
```

5. **Open Frontend:**
- Simply open `index.html` in your browser, or
- Use a local server (recommended):
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
learning-platform/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Frontend JavaScript
├── api.js              # API integration
└── README.md           # This file

backend/
├── server.js           # Express server
├── models/             # Database models
├── routes/             # API routes
├── controllers/        # Business logic
├── middleware/         # Auth middleware
└── config/             # Configuration
```

## API Endpoints

All API endpoints are prefixed with `/api`

- Authentication: `/api/auth/*`
- Progress: `/api/progress/*`
- Lessons: `/api/lessons/*`
- Analytics: `/api/analytics/*`
- Mock Tests: `/api/mock-tests/*`
- Study Path: `/api/study-path/*`
- Dashboard: `/api/dashboard/*`
- Reports: `/api/reports/*`
- Matches: `/api/matches/*`

## Modules

1. **Student Progress & Learning-Gap Finder** - Track progress and identify gaps
2. **Automatic Lesson Difficulty Adjuster** - AI adjusts difficulty automatically
   - **NEW**: Create and complete lessons to see real-time progress updates
   - **NEW**: Progress automatically updates when you complete lessons
   - **NEW**: Difficulty adjusts based on your performance
3. **Performance Analytics & Insights** - Comprehensive analytics
4. **Personalized Mock Test Creator** - AI-generated tests
5. **Step-by-Step Study Path Guide** - Personalized study paths
6. **Progress Dashboard** - Student and teacher dashboards
7. **Automated Report Generator** - Generate performance reports
8. **Study Matchmaker** - Connect with study partners
9. **Data Privacy Shield** - Privacy and security information
10. **Authentication** - Secure login/signup

## Using Dynamic Features

### Creating and Completing Lessons

1. **Login/Signup** to your account
2. Navigate to **"Difficulty Adjuster"** module
3. Click **"Create New Lesson"** button
4. Fill in:
   - Subject (Mathematics, Science, English, etc.)
   - Topic (e.g., "Algebra Basics")
   - Difficulty Level (Easy, Medium, Hard)
5. Click **"Create Lesson"**

### Completing Lessons

1. Find your lesson in the lessons list
2. Click **"Complete"** button
3. Enter your performance data:
   - Accuracy percentage (0-100%)
   - Completion rate (0-100%)
   - Time taken (in minutes)
4. Click **"Mark as Complete"**

### What Happens Automatically

- ✅ Your progress is automatically updated
- ✅ Subject-wise performance is calculated
- ✅ Overall progress percentage updates
- ✅ Difficulty level adjusts based on your accuracy
- ✅ Analytics and insights refresh
- ✅ Dashboard shows updated statistics

### All Data is Dynamic

- No predefined or static data
- Everything updates based on your actions
- Progress, analytics, and recommendations change as you learn
- Each user has their own personalized data

## Technologies

**Frontend:**
- HTML5
- CSS3 (with animations)
- Vanilla JavaScript (ES6 modules)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Development

- Backend runs on `http://localhost:5000`
- Frontend API is configured to connect to `http://localhost:5000/api`
- Update `API_BASE_URL` in `api.js` if using different port

## License

ISC
