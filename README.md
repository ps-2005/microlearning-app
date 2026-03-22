# Microlearning_app
AI-Powered Microlearning Platform
This repository contains the source code for an AI-powered microlearning web application developed as an In-House NTCC project. The platform leverages Large Language Models (LLMs) to generate personalized, bite-sized lessons and interactive quizzes on any user-provided topic.

## Overview
The system simulates a "Duolingo for Everything" experience. Users enter a topic of interest, and the application instantly provides a structured mini-lesson followed by a quiz to test retention and comprehension.

### Key Features

Topic-Based Generation: Generates concise, beginner-friendly lessons and quizzes for any subject using GPT-4o.


Interactive Quizzes: Features one-question-at-a-time navigation with real-time feedback and answer locking.


User Personalization: Includes Google Authentication and a personalized history dashboard to track progress.


Modern UI/UX: Built with a responsive design supporting both Dark and Light modes, enhanced by smooth animations.

## System Architecture
The application follows a full-stack architecture, utilizing a FastAPI backend to bridge the React frontend with AI models and cloud storage.

### Overall Data Flow

User Input: The user submits a topic through the React-based frontend.


API Request: The frontend sends an HTTP request (via Axios) to the FastAPI /generate endpoint.


LLM Processing: The backend communicates with OpenRouter (GPT-4o) to generate structured JSON content.


Content Delivery: The backend validates the data using Pydantic and returns it to the frontend for rendering.


Session Persistence: Quiz results and lesson history are automatically saved to Firebase/Firestore.
