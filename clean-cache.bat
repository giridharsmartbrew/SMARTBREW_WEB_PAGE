@echo off
echo ===== SMARTBREW Cache Cleaner =====
echo Cleaning all cache files...

:: Remove Vite cache directories
echo Removing Vite cache directories...
if exist node_modules\.vite rmdir /s /q node_modules\.vite
if exist .vite_cache rmdir /s /q .vite_cache
if exist dist rmdir /s /q dist

:: Clear npm cache
echo Clearing npm cache...
call npm cache clean --force

:: Try to clear Chrome cache
echo Attempting to clear Chrome cache...
if exist "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache" rmdir /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache"
if exist "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Code Cache" rmdir /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Code Cache"

echo Cache cleaning complete!
echo To start development server with fresh cache, run:
echo npm run clean-dev

pause 