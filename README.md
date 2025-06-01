# README.md
# My FastAPI Web Project

## Description
A simple personal webpage using FastAPI (backend) and HTML/CSS/JS (frontend), Dockerized and served with Docker Compose.

## Run the Project
```bash
docker compose up --build
```

Frontend: http://localhost:8080  
Backend API: http://localhost:8000/api/messages

## Features
- Persistent message storage using SQLite
- Timestamped messages displayed on frontend
- Total visit count tracking with FastAPI middleware
- Dark mode toggle button
- Delete all messages feature
- Dockerized for easy deployment
