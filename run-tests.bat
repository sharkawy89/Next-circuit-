@echo off
REM Test script for authentication flow
REM Prerequisites: MongoDB running, backend server on http://localhost:5000

cd /d "%~dp0backend"

echo ========================================
echo Next-Circuit Authentication Tests
echo ========================================
echo.
echo This script will:
echo  1. Test user registration (signup)
echo  2. Verify data is saved to MongoDB
echo  3. Test user login
echo  4. Test invalid credentials
echo  5. Validate the complete signup/login/DB flow
echo.

echo Ensure MongoDB is running before continuing!
echo Press any key to start tests...
pause

echo.
echo Starting tests...
node test-auth.js

echo.
echo Tests completed. Check output above for results.
pause
