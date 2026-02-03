@echo off
echo ========================================
echo Starting MongoDB Service
echo ========================================
echo.
echo This requires Administrator privileges.
echo You may see a UAC prompt.
echo.

net start MongoDB

if %errorlevel% == 0 (
    echo.
    echo ✅ MongoDB service started successfully!
    echo.
) else (
    echo.
    echo ⚠️  Could not start MongoDB service.
    echo.
    echo Please try one of these:
    echo 1. Right-click this file and select "Run as Administrator"
    echo 2. Or manually start MongoDB service from Services (services.msc)
    echo.
)

pause
