import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
API_URL = "https://openrouter.ai/api/v1/chat/completions"

def query_openrouter(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",  # optional, used for OpenRouter stats
        "X-Title": "MicrolearningGPT"
    }

    payload = {
        "model": "mistralai/mistral-7b-instruct",  # ✅ You can change to gpt-3.5 or claude-3-haiku if needed
        "messages": [
            {"role": "system", "content": "You are a helpful microlearning tutor."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }

    response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
    print("🔵 Full OpenRouter response:", response.text)
    result = response.json()

    return result["choices"][0]["message"]["content"]

def gen_lesson_and_quiz(topic: str) -> dict:
    prompt = f"""
You're an AI tutor. Generate a detailed lesson (around 20 lines) on the topic "{topic}" and 3 MCQs based on that.

Return a VALID JSON **without** extra headers like "Section 1", only plain keys.

Format:
{{
  "lesson": "<full lesson as plain text (no JSON nesting)>",
  "quiz": [
    {{
      "question": "...",
      "options": ["A...", "B...", "C...", "D..."],
      "answer": "A"
    }},
    ...
  ]
}}
Only respond with the JSON.
"""

    response_text = query_openrouter(prompt)

    try:
        json_start = response_text.find("{")
        json_data = json.loads(response_text[json_start:])
        return json_data
    except Exception as e:
        print("❌ Error parsing JSON:", e)
        print("Raw response:", response_text)
        raise e
