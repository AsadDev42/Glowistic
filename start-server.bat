@echo off
title GLOWISTIC Local Storefront Server
cd /d "%~dp0"
echo Starting GLOWISTIC Local Web Server...
start "" "http://localhost:3000"
node server.js
pause
