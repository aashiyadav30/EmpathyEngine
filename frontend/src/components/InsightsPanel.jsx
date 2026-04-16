import React from 'react';
import './InsightsPanel.css';

export default function InsightsPanel({ config }) {
  if (!config) return null;

  return (
    <div className="insights-panel animate-fade-in">
      <div className="insights-header">
        <h3>Voice Parameters</h3>
        <p>Technical adjustments for emotional expression.</p>
      </div>

      <div className="metrics-row">
        <div className="metric-item">
          <span className="metric-label">Speech Rate</span>
          <span className="metric-value">{config.rate} <small>WPM</small></span>
        </div>
        <div className="metric-divider">|</div>
        <div className="metric-item">
          <span className="metric-label">Volume</span>
          <span className="metric-value">{Math.round(config.volume * 100)}<small>%</small></span>
        </div>
        <div className="metric-divider">|</div>
        <div className="metric-item">
          <span className="metric-label">Tone</span>
          <span className="metric-value">Adapted</span>
        </div>
        <div className="metric-divider">|</div>
        <div className="metric-item">
          <span className="metric-label">Stability</span>
          <span className="metric-value">High</span>
        </div>
      </div>

      <div className="insights-explanation">
        <p>Parameters adjust dynamically: faster rate for excitement, varied volume for intensity, adapted tone for natural expression.</p>
      </div>
    </div>
  );
}
