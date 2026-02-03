# Step-by-Step Guide to Start the Backend

## Prerequisites Installation

### Step 1: Install Node.js

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the LTS (Long Term Support) version for Windows
   - Choose the Windows Installer (.msi) file

2. **Install Node.js:**
   - Run the downloaded installer
   - Click "Next" through the installation wizard
   - Make sure "Add to PATH" is checked (it should be by default)
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify Installation:**
   - Open a new Command Prompt or PowerShell window
   - Run: `node --version` (should show version like v18.x.x or higher)
   - Run: `npm --version` (should show version like 9.x.x or higher)

### Step 2: Install MongoDB

**Option A: MongoDB Community Server (Recommended for Development)**

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select:
     - Version: Latest (or 6.0+)
     - Platform: Windows
     - Package: MSI
   - Click "Download"

2. **Install MongoDB:**
   - Run the downloaded installer
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (GUI tool - optional but helpful)
   - Click "Install"
   - Wait for installation to complete

3. **Verify MongoDB is Running:**
   - MongoDB should start automatically as a Windows service
   - You can check in Services (Windows Key + R, type "services.msc")
   - Look for "MongoDB" service - it should be "Running"

**Option B: MongoDB Atlas (Cloud - No Local Installation Needed)**

If you prefer cloud database:
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Use that connection string in `.env` file instead of local MongoDB

---

## Backend Setup Steps

### Step 3: Navigate to Backend Directory

Open Command Prompt or PowerShell and navigate to the backend folder:

```bash
cd D:\Hackathon\backend
```

### Step 4: Install Backend Dependencies

Install all required Node.js packages:

```bash
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB driver)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (cross-origin requests)
- dotenv (environment variables)
- express-validator (input validation)

**Expected Output:**
- You'll see packages being downloaded
- Wait for "added X packages" message
- This may take 2-5 minutes

### Step 5: Create Environment Configuration File

1. **Create `.env` file in the backend folder:**
   - Navigate to: `D:\Hackathon\backend\`
   - Create a new file named `.env` (note the dot at the beginning)
   - Open it in a text editor

2. **Add the following content to `.env`:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-learning-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
NODE_ENV=development
```

**Important Notes:**
- `PORT=5000` - Backend will run on port 5000
- `MONGODB_URI` - For local MongoDB, use: `mongodb://localhost:27017/ai-learning-platform`
  - If using MongoDB Atlas, replace with your Atlas connection string
- `JWT_SECRET` - Change this to a random long string for security
- Save the file

### Step 6: Verify MongoDB Connection

**For Local MongoDB:**
- Make sure MongoDB service is running (check Windows Services)
- MongoDB should be accessible at `mongodb://localhost:27017`

**For MongoDB Atlas:**
- Make sure your connection string in `.env` is correct
- Whitelist your IP address in Atlas dashboard

### Step 7: Start the Backend Server

**Option A: Development Mode (with auto-restart):**

```bash
npm run dev
```

**Option B: Production Mode:**

```bash
npm start
```

**Expected Output:**
```
Server running in development mode on port 5000
MongoDB Connected: localhost:27017
```

### Step 8: Verify Backend is Running

1. **Check the terminal output:**
   - You should see: "Server running in development mode on port 5000"
   - You should see: "MongoDB Connected: ..."

2. **Test the API:**
   - Open a browser
   - Go to: `http://localhost:5000/api/health`
   - You should see: `{"success":true,"message":"Server is running"}`

3. **Keep the terminal window open** - The server needs to keep running

---

## Troubleshooting

### Problem: "node is not recognized"
**Solution:** 
- Node.js is not installed or not in PATH
- Reinstall Node.js and make sure "Add to PATH" is checked
- Restart your terminal/command prompt after installation

### Problem: "npm is not recognized"
**Solution:**
- Same as above - Node.js installation includes npm
- Reinstall Node.js

### Problem: "MongoDB connection error"
**Solution:**
- Check if MongoDB service is running (Windows Services)
- For local MongoDB: Make sure MongoDB is installed and service is started
- For Atlas: Check connection string and IP whitelist

### Problem: "Port 5000 already in use"
**Solution:**
- Change PORT in `.env` file to another number (e.g., 5001, 3000)
- Or stop the application using port 5000

### Problem: "Cannot find module" errors
**Solution:**
- Make sure you ran `npm install` in the backend folder
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Problem: "EADDRINUSE" error
**Solution:**
- Port is already in use
- Change PORT in `.env` or stop the other application

---

## Quick Start Summary

Once everything is installed, these are the only commands you need:

```bash
# 1. Navigate to backend folder
cd D:\Hackathon\backend

# 2. Install dependencies (only needed once)
npm install

# 3. Start the server
npm run dev
```

---

## Next Steps

After backend is running:

1. **Start Frontend:**
   - Open `learning-platform/index.html` in browser
   - Or use a local server (recommended):
     ```bash
     # In learning-platform folder
     python -m http.server 8000
     ```
   - Then open: `http://localhost:8000`

2. **Test the Application:**
   - Go to landing page
   - Click "Sign Up" to create an account
   - Login and explore all modules

---

## Important Notes

- **Keep backend terminal open** - Server must keep running
- **MongoDB must be running** - Either local service or Atlas connection
- **Backend runs on:** `http://localhost:5000`
- **API endpoints:** `http://localhost:5000/api/*`
- **Frontend connects to:** `http://localhost:5000/api` (configured in `api.js`)

---

## Development vs Production

- **Development (`npm run dev`):** 
  - Uses nodemon for auto-restart on file changes
  - Better for development

- **Production (`npm start`):**
  - Standard node execution
  - Better for production deployment
