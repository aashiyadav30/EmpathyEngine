import React, { useRef, useState, useEffect } from 'react';
import './ComparisonPlayer.css';
import { Download } from 'lucide-react';

export default function ComparisonPlayer({ title, isEmotional, audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  const formatTime = (time) => {
    if (!time || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!audioUrl) return null;
  const fullUrl = `${import.meta.env.VITE_API_URL}${audioUrl}`;

  return (
    <div className={`player-card ${isEmotional ? 'emotional-card' : 'neutral-card'}`}>
      <div className="player-header">
        <div>
          <h3 className="player-title">{title}</h3>
        </div>
        <a
          href={fullUrl}
          download
          className="download-link"
          title="Download"
        >
          <Download size={18} />
        </a>
      </div>

      <div className="player-controls">
        <button className="play-button" onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            {isPlaying ? (
              <>
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </>
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>

        <div className="progress-container">
          <div
            className="progress-bar"
            onClick={handleProgressClick}
            role="slider"
            tabIndex="0"
            aria-label="Audio progress"
          >
            <div
              className="progress-fill"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>

        <span className="time-display">{formatTime(currentTime)}</span>
      </div>

      <audio
        ref={audioRef}
        src={fullUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </div>
  );
}
