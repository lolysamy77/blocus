@echo off
rem Lance le site en local : http://localhost:8000 (l'accueil s'ouvre tout seul)
cd /d "%~dp0"
python serve.py
if errorlevel 1 pause
