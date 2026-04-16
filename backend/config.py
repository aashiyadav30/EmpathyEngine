# backend/config.py

EMOTION_MAP = {
    "Happy": {
        "rate_multiplier": 1.15,
        "volume_multiplier": 1.0,
        "pitch_description": "bright and clear",
        "emoji": "😁",
        "elevenlabs_voice_id": "zrHiDhphv9ZnVBTuAHu4"
    },
    "Excited": {
        "rate_multiplier": 1.35,
        "volume_multiplier": 1.0,
        "pitch_description": "high and fast",
        "emoji": "🥳",
        "elevenlabs_voice_id": "tx3xeKwWEJlwsDAmqcUq"
    },
    "Sad": {
        "rate_multiplier": 0.75,
        "volume_multiplier": 0.5,
        "pitch_description": "low and slow",
        "emoji": "😔",
        "elevenlabs_voice_id": "MF3mGyEYCl7XYWbV9V6O"
    },
    "Angry": {
        "rate_multiplier": 1.4,
        "volume_multiplier": 1.0,
        "pitch_description": "sharp and intense",
        "emoji": "😠",
        "elevenlabs_voice_id": "29vD33N1CtxCmqQRPOHJ"
    },
    "Calm": {
        "rate_multiplier": 0.85,
        "volume_multiplier": 0.7,
        "pitch_description": "smooth and soft",
        "emoji": "🫠",
        "elevenlabs_voice_id": "XrExE9yKIg1WjnnlVkGX"
    },
    "Neutral": {
        "rate_multiplier": 1.0,
        "volume_multiplier": 0.9,
        "pitch_description": "normal and steady",
        "emoji": "☺️",
        "elevenlabs_voice_id": "21m00Tcm4TlvDq8ikWAM"
    }
}

DEFAULT_RATE = 175  # words per minute
DEFAULT_VOLUME = 1.0
