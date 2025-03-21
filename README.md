# MERN Learning System

A comprehensive online learning platform built with the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Project Overview

This system provides an interactive learning platform where students can enroll in courses while instructors can create and manage their online courses.

### Key Features

- User Authentication (Register/Login)
- Role-based Access Control (Student/Instructor)
- Profile Management
- Course Browsing and Enrollment (Students)
- Course Creation and Management (Instructors)

## Tech Stack

### Frontend
- React.js
- Bootstrap
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Passport.js
- Bcrypt

## Installation Guide

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Setup Steps

1. Clone the repository
```bash
git clone git@github.com:cczzHoward/EduMERN.git
```

2. Install backend dependencies
```bash
cd Server
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Environment Configuration
Create a .env file in the Server directory:
```env
PASSPORT_SECRET=your_secret_key
MONGODB_URI=mongodb://localhost:27017/mern-practice-DB
```

5. Start MongoDB service

6. Launch backend server
```bash
cd Server
npm start
```

7. Start frontend development server
```bash
cd client
npm start
```

## Usage Guide

### For Students
- Register a new account
- Browse available courses
- Enroll in courses of interest
- View personal profile

### For Instructors
- Register as an instructor
- Create new courses
- Manage course content
- Monitor student enrollments

## API Endpoints

### Authentication Routes
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/profile - Get user profile

### Course Routes
- GET /api/courses - Get all courses
- POST /api/courses - Create a new course (Instructor only)
- GET /api/courses/:id - Get specific course
- PUT /api/courses/:id - Update course (Instructor only)

## Security Notice

This system is for practice purposes only. Please do not enter real personal information or credit card details.