from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import TopicRequest, LessonResponse
from gpt_utils import gen_lesson_and_quiz

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate", response_model=LessonResponse)
def generate(req: TopicRequest):
    try:
        data = gen_lesson_and_quiz(req.topic)  # Only topic
        return data
    except Exception as e:
        print("❌ Backend Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
