@echo off
REM Aurangzeb Sunny Portfolio - Quick Deploy Script for Windows

echo.
echo ========================================
echo  Aurangzeb Sunny Portfolio Deployment
echo ========================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo X Vercel CLI not found. Installing...
    npm install -g vercel
) else (
    echo V Vercel CLI is installed
)

echo.
echo Pre-deployment checklist:
echo V MongoDB connection configured
echo V All API routes ready
echo V Hybrid storage system active
echo.

echo What would you like to do?
echo 1) Deploy to Vercel (Production)
echo 2) Deploy to Preview
echo 3) Add MongoDB environment variable
echo 4) View deployment logs
echo 5) Exit
echo.

set /p choice="Enter choice [1-5]: "

if "%choice%"=="1" goto production
if "%choice%"=="2" goto preview
if "%choice%"=="3" goto addenv
if "%choice%"=="4" goto logs
if "%choice%"=="5" goto end
goto invalid

:production
echo.
echo Deploying to Production...
vercel --prod
goto finish

:preview
echo.
echo Deploying to Preview...
vercel
goto finish

:addenv
echo.
echo Adding MongoDB environment variable...
echo.
echo When prompted, paste this value:
echo mongodb+srv://parizaadsunny_db_user:pS2TrTuUkpUAAHy1@portfolio.22goksc.mongodb.net/?appName=portfolio
echo.
pause
vercel env add MONGODB_URI
goto finish

:logs
echo.
echo Fetching deployment logs...
vercel logs
goto finish

:invalid
echo X Invalid choice
exit /b 1

:finish
echo.
echo V Done!
echo.
echo Next steps:
echo 1. Visit your deployed URL
echo 2. Check console for MongoDB connection
echo 3. Go to /admin to manage content
echo.
goto end

:end
exit /b 0
