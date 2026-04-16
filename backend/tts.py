import pyttsx3
import uuid
import os
import requests
from dotenv import load_dotenv
from config import EMOTION_MAP, DEFAULT_RATE, DEFAULT_VOLUME

load_dotenv()
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static", "audio")
os.makedirs(STATIC_DIR, exist_ok=True)

def generate_audio(text: str, emotion: str, intensity: float, is_emotional: bool = True):
    api_key = os.getenv("ELEVENLABS_API_KEY")
    
    
    # Common variables
    target_rate = DEFAULT_RATE
    target_volume = DEFAULT_VOLUME
    config = EMOTION_MAP.get(emotion) if (is_emotional and emotion in EMOTION_MAP) else EMOTION_MAP.get("Neutral")
    
    if is_emotional:
        rate_mult = 1.0 + (config["rate_multiplier"] - 1.0) * intensity
        vol_mult = 1.0 + (config["volume_multiplier"] - 1.0) * intensity
        target_rate = int(DEFAULT_RATE * rate_mult)
        target_volume = DEFAULT_VOLUME * vol_mult
        
    target_volume = max(0.0, min(1.0, target_volume))
    target_rate = max(50, min(350, target_rate))

    filename_base = f"{uuid.uuid4().hex}"
    
    # 1. ElevenLabs Mode
    if api_key and api_key.strip():
        voice_id = "ZDoJVr3BwmXHRqRFv2ly"
        
        # Stability: 1.0 means stable, 0.0 means highly variable (emotional)
        # We decrease stability as intensity increases
        stability = max(0.1, 1.0 - (intensity * 0.5)) if is_emotional else 0.8
        
        try:
            response = requests.post(
                f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
                headers={
                    "xi-api-key": api_key,
                    "Content-Type": "application/json"
                },
                json={
                    "text": text,
                    "model_id": "eleven_turbo_v2",
                    "voice_settings": {
                        "stability": stability,
                        "similarity_boost": 0.75
                    }
                }
            )
            
            if response.status_code == 200:
                filename = f"{filename_base}.mp3"
                filepath = os.path.join(STATIC_DIR, filename)
                with open(filepath, "wb") as f:
                    f.write(response.content)
                    
                return {
                    "rate": target_rate,  # Simulated display value
                    "volume": round(target_volume, 2), # Simulated display value
                    "filename": filename
                }
            else:
                print(f"ElevenLabs API error: {response.text}")
                # Fall through to pyttsx3 fallback
        except Exception as e:
            print(f"ElevenLabs Exception: {e}")
            # Fall through to pyttsx3
            
    # 2. Pyttsx3 Fallback Mode
    engine = pyttsx3.init()
    engine.setProperty('rate', target_rate)
    engine.setProperty('volume', target_volume)
    
    filename = f"{filename_base}.wav"
    filepath = os.path.join(STATIC_DIR, filename)
    
    engine.save_to_file(text, filepath)
    engine.runAndWait()
    
    return {
        "rate": target_rate,
        "volume": round(target_volume, 2),
        "filename": filename
    }
