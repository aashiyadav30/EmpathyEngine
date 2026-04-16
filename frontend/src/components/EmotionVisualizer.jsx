import React from 'react';
import './EmotionVisualizer.css';

const EMOTION_EMOJIS = {
  Happy: '😁',
  Excited: '🥳',
  Sad: '😔',
  Angry: '😠',
  Calm: '🫠',
  Neutral: '☺️'
};

export default function EmotionVisualizer({ emotion, intensity }) {
  if (!emotion) return null;

  const emoji = EMOTION_EMOJIS[emotion] || '😐';
  const percentage = Math.round(intensity * 100);

  return (
    <div className="emotion-visualizer animate-fade-in">
      <div className="emotion-header">
        <h3>Detected Emotion</h3>
      </div>

      <div className="emotion-display">
        <div className="emotion-emoji">{emoji}</div>
        <h2 className="emotion-name" data-emotion={emotion.toLowerCase()}>
          {emotion}
        </h2>
      </div>

      <div className="intensity-container">
        <div className="intensity-header">
          <span>Emotional Strength</span>
          <span className="intensity-value">{percentage}%</span>
        </div>
        <div className="intensity-track">
          <div
            className="intensity-bar"
            style={{
              width: `${percentage}%`,
              backgroundColor: `var(--color-${emotion.toLowerCase()})`
            }}
          />
        </div>
      </div>
    </div>
  );
}
