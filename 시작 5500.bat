@echo off
chcp 65001
cd /d "%~dp0"
start http://localhost:5500
npx serve -l 5500 .
