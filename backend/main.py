from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    id: int
    content: str
    timestamp: str

messages: List[Message] = []
visitor_count = 0

@app.get("/messages")
def get_messages():
    sorted_msgs = sorted(messages, key=lambda m: m.timestamp)
    return sorted_msgs

@app.post("/messages")
def post_message(msg: dict):
    new_msg = Message(
        id=len(messages) + 1,
        content=msg["content"],
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    messages.append(new_msg)
    return new_msg

@app.delete("/messages/{msg_id}")
def delete_message(msg_id: int):
    global messages
    messages = [msg for msg in messages if msg.id != msg_id]
    return {"ok": True}

@app.get("/visitors")
def get_visitors():
    global visitor_count
    visitor_count += 1
    return {"visits": visitor_count}

@app.get("/", response_class=HTMLResponse)
def root():
    with open("frontend/index.html") as f:
        return HTMLResponse(f.read())