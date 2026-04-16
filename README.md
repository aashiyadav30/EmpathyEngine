# Empathy Engine

**Live Demo:** https://empathy-engine-rouge.vercel.app/

Empathy Engine is an emotion-aware speech synthesis system that analyzes the emotional tone of text and generates dynamically modulated speech. It combines natural language processing with audio synthesis to produce expressive, human-like voice output that adapts to both emotion type and intensity.

---

## Overview

This project demonstrates how AI can enhance user experience by making machine-generated speech more natural and emotionally responsive. Instead of static text-to-speech output, Empathy Engine adjusts voice characteristics such as rate and volume based on detected emotional context.

---

## Key Features

* Multi-class emotion detection (Happy, Excited, Sad, Angry, Calm, Neutral)
* Intensity-based voice modulation (continuous scaling from 0.0 to 1.0)
* Dual audio generation (emotional vs neutral comparison)
* Real-time API-based processing
* Modern frontend with responsive UI

---

## Technology Stack

### Backend

* Python
* FastAPI
* Hugging Face Transformers (`j-hartmann/emotion-english-distilroberta-base`)
* PyTorch
* pyttsx3

### Frontend

* React (Vite)
* CSS (custom styling)
* lucide-react

### Deployment

* Frontend: Vercel
* Backend: Render

---

## System Architecture

```text
User Input → Emotion Detection (Transformers) → Intensity Mapping → Voice Modulation → Audio Generation → Frontend Playback
```

---

## Setup Instructions

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API

Interactive documentation available at:

```
http://localhost:8000/docs
```

### POST /speak

**Request**

```json
{
  "text": "I am absolutely devastated. I can't believe this is happening..."
}
```

**Response**

```json
{
  "text": "...",
  "emotion": "Sad",
  "intensity": 0.94,
  "voice_config": {
    "rate": 133,
    "volume": 0.53
  },
  "audio_url": "/audio/...",
  "normal_audio_url": "/audio/..."
}
```

---

## Emotion-to-Voice Logic

The system applies a structured pipeline:

1. Emotion classification using a transformer model
2. Mapping raw labels to application-specific categories
3. Applying predefined modulation limits per emotion
4. Scaling voice parameters proportionally using intensity

This allows smooth interpolation between neutral and fully expressive speech.

---

## Project Structure

```text
EmpathyEngine/
├── backend/
│   ├── app.py
│   ├── emotion.py
│   ├── tts.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

---

## Environment Variables

### Backend

```
API_KEY=your_secret_key
```

### Frontend

```
VITE_API_URL=https://empathyengine-backend.onrender.com
```

---

## Deployment Notes

* Environment variables are managed via platform dashboards (Render and Vercel)
* `.env` files are excluded from version control
* ML dependencies (PyTorch, Transformers) may increase deployment time

---

## Potential Improvements

* Streaming audio generation
* Multi-language support
* Advanced voice synthesis models
* User session history and analytics
* Performance optimization for model inference

---

## Author

Aashi Yadav

---

## Acknowledgment

If you found this project useful or interesting, consider starring the repository.
