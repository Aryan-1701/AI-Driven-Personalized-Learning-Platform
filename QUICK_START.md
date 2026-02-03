# Quick Start Guide - Backend Setup

## ⚠️ IMPORTANT: Node.js Required First!

**You need to install Node.js before the backend can start.**

## Step 1: Install Node.js (REQUIRED)

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Click "Download Node.js (LTS)" - the green button
   - This will download the Windows installer

2. **Install Node.js:**
   - Run the downloaded `.msi` file
   - Click "Next" through all steps
   - Make sure "Add to PATH" is checked (default)
   - Click "Install"
   - Wait for installation
   - Click "Finish"

3. **Restart your computer** (or at least close and reopen all terminal windows)

4. **Verify Installation:**
   - Open a NEW Command Prompt or PowerShell
   - Type: `node --version`
   - You should see a version number (like v18.x.x or v20.x.x)
   - Type: `npm --version`
   - You should see a version number (like 9.x.x)

## Step 2: Start the Backend

### Option A: Using the Batch File (Easiest)

1. **Double-click `START_BACKEND.bat`** in the Hackathon folder
   - It will automatically:
     - Check if Node.js is installed
     - Install dependencies if needed
     - Start the server

### Option B: Manual Start

1. **Open Command Prompt or PowerShell**

2. **Navigate to backend folder:**
   ```bash
   cd D:\Hackathon\backend
   ```

3. **Install dependencies (first time only):**
   ```bash
   npm install
   ```
   Wait for this to complete (2-5 minutes)

4. **Start the server:**
   ```bash
   npm run dev
   ```

5. **You should see:**
   ```
   Server running in development mode on port 5000
   MongoDB Connected: localhost:27017
   ```

## Step 3: Verify Backend is Running

1. **Keep the terminal window open** (server must keep running)

2. **Open a browser and go to:**
   ```
   http://localhost:5000/api/health
   ```

3. **You should see:**
   ```json
   {"success":true,"message":"Server is running"}
   ```

## Troubleshooting

### "node is not recognized"
- Node.js is not installed or not in PATH
- Install Node.js (see Step 1)
- Restart your computer after installation
- Open a NEW terminal window

### "MongoDB connection error"
- MongoDB needs to be installed and running
- Option 1: Install MongoDB locally
- Option 2: Use MongoDB Atlas (cloud - free)
  - Sign up at: https://www.mongodb.com/cloud/atlas
  - Create a free cluster
  - Get connection string
  - Update `.env` file with Atlas connection string

### "Port 5000 already in use"
- Another application is using port 5000
- Change PORT in `backend/.env` to 5001 or 3000
- Or stop the other application

## What's Already Done

✅ Backend code is created  
✅ `.env` file is created  
✅ All routes and controllers are set up  
✅ Database models are ready  

## What You Need to Do

1. ⬇️ Install Node.js (REQUIRED)
2. ⬇️ Install MongoDB (or use Atlas cloud)
3. ▶️ Run `npm install` in backend folder
4. ▶️ Run `npm run dev` to start server

## After Backend Starts

- Backend runs on: `http://localhost:5000`
- API endpoints: `http://localhost:5000/api/*`
- Frontend will automatically connect to backend
- Open `learning-platform/index.html` in browser to use the app
