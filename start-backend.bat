@echo off
REM Startup script for Next-Circuit Backend Development
REM Usage: Run this batch file from the project root

echo ========================================
echo Next-Circuit Backend Startup
echo ========================================
echo.

cd backend

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo Step 2: Starting backend server...
echo Server will run on http://localhost:5000
echo Press Ctrl+C to stop
echo.

call npm run dev
