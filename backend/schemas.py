from pydantic import BaseModel
from typing import List

class TopicRequest(BaseModel):
    topic: str

class QuizItem(BaseModel):
    question: str
    options: List[str]  
    answer: str

class LessonResponse(BaseModel):
    lesson: str
    quiz: List[QuizItem]  
