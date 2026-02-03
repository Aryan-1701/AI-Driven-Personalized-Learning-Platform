@echo off
echo ========================================
echo Starting AI Learning Platform Backend
echo ========================================
echo.

cd /d "%~dp0backend"

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to https://nodejs.org/
    echo 2. Download and install the LTS version
    echo 3. Restart this script
    echo.
    pause
    exit /b 1
)

echo Node.js found!
echo.

echo Checking if dependencies are installed...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
)

echo Starting backend server...
echo.
echo Backend will run on: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

call npm run dev

pause
