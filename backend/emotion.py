import requests
import os

HF_TOKEN = os.getenv("HF_TOKEN")

API_URL = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
} if HF_TOKEN else {}

def analyze(text: str):
    try:
        response = requests.post(
            API_URL,
            headers=headers,
            json={"inputs": text},
            timeout=10
        )

        if response.status_code != 200:
            print("HF API Error:", response.text)
            raise Exception("HuggingFace API failed")

        result = response.json()[0]

        # Pick highest scoring emotion
        top = max(result, key=lambda x: x["score"])

        label = top["label"]
        score = top["score"]

        # 🎯 Map labels to your custom emotions
        mapped_emotion = "Neutral"

        if label == "joy":
            mapped_emotion = "Excited" if score > 0.8 else "Happy"
        elif label in ["anger", "disgust"]:
            mapped_emotion = "Angry"
        elif label in ["sadness", "fear"]:
            mapped_emotion = "Sad"
        elif label == "surprise":
            mapped_emotion = "Excited"
        elif label == "neutral":
            mapped_emotion = "Calm" if score > 0.7 else "Neutral"

        return {
            "emotion": mapped_emotion,
            "intensity": round(score, 3),
            "raw_label": label
        }

    except requests.exceptions.Timeout:
        raise Exception("Emotion API timeout")

    except Exception as e:
        print("Emotion detection error:", e)
        return {
            "emotion": "Neutral",
            "intensity": 0.5,
            "raw_label": "neutral"
        }