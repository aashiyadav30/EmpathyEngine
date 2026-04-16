from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from emotion import analyze
from tts import generate_audio
import os

# =========================
# 🚀 App Init
# =========================
app = FastAPI(title="Empathy Engine API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# 📁 Static Audio Directory
# =========================
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static", "audio")
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/audio", StaticFiles(directory=STATIC_DIR), name="audio")

# =========================
# 📦 Request Schema
# =========================
class TextRequest(BaseModel):
    text: str


# =========================
# 🔍 Analyze Endpoint
# =========================
@app.post("/analyze")
async def analyze_text(req: TextRequest):
    text = req.text.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    if len(text) > 300:
        raise HTTPException(status_code=400, detail="Text too long (max 300 chars)")

    return analyze(text)


# =========================
# 🔊 Speak Endpoint
# =========================
@app.post("/speak")
async def speak_text(req: TextRequest):
    text = req.text.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    if len(text) > 300:
        raise HTTPException(status_code=400, detail="Text too long (max 300 chars)")

    # 🔍 Emotion Analysis (API-based now)
    analysis = analyze(text)

    emotion = analysis["emotion"]
    intensity = analysis["intensity"]

    # 🔊 Generate audio
    emotional_audio = generate_audio(
        text, emotion, intensity, is_emotional=True
    )

    return {
        "text": text,
        "emotion": emotion,
        "intensity": intensity,
        "voice_config": {
            "rate": emotional_audio["rate"],
            "volume": emotional_audio["volume"]
        },
        "audio_url": f"/audio/{emotional_audio['filename']}"
    }


# =========================
# 🧪 Health Check
# =========================
@app.get("/")
def root():
    return {"status": "Empathy Engine running 🚀"}


# =========================
# 🏁 Local Run
# =========================
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)