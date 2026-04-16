import React, { useState } from 'react';
import './App.css';
import InputArea from './components/InputArea';
import EmotionVisualizer from './components/EmotionVisualizer';
import InsightsPanel from './components/InsightsPanel';
import ComparisonPlayer from './components/ComparisonPlayer';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (text) => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/speak`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <span className="header-eyebrow">Voice Synthesis</span>
        <h1>Give your words emotional weight.</h1>
        <p className="header-description">
          Detects the sentiment behind text and generates speech that actually sounds human — not robotic.
        </p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main className="app-main">
        <div className="content-grid">
          <div className="left-panel">
            <section className="input-section">
              <InputArea onAnalyze={handleAnalyze} isProcessing={isProcessing} />
            </section>

            {result && (
              <section className="emotion-section">
                <EmotionVisualizer emotion={result.emotion} intensity={result.intensity} />
                <div className="emotion-explanation">
                  <h3>Emotion Analysis</h3>
                  <p><strong>Detected:</strong> {result.emotion}</p>
                  <p><strong>Meaning:</strong> {
                    result.emotion === 'happy' ? 'Joy and positivity' :
                    result.emotion === 'excited' ? 'Enthusiasm and energy' :
                    result.emotion === 'sad' ? 'Sorrow or melancholy' :
                    result.emotion === 'angry' ? 'Frustration or anger' :
                    result.emotion === 'calm' ? 'Peace and composure' :
                    'Balanced and objective'
                  }</p>
                  <p><strong>Voice effect:</strong> {
                    result.emotion === 'happy' ? 'Warm and upbeat tone' :
                    result.emotion === 'excited' ? 'Higher pitch and faster pace' :
                    result.emotion === 'sad' ? 'Softer and slower delivery' :
                    result.emotion === 'angry' ? 'Forceful and intense' :
                    result.emotion === 'calm' ? 'Steady and gentle' :
                    'Standard neutral tone'
                  }</p>
                </div>
              </section>
            )}
          </div>

          <div className="right-panel">
            {result && (
              <>
                <section className="comparison-section">
                  <div className="section-intro">
                    <h2>Voice Comparison</h2>
                    <p>Compare how emotional context changes speech delivery. The emotional voice adapts tone, pitch, and pacing to match the detected feeling.</p>
                  </div>
                  <div className="players-grid">
                    <div className="player-item">
                      <h3>Emotional Voice</h3>
                      <p>Adapts to {result.emotion.toLowerCase()} tone</p>
                      <ComparisonPlayer
                        title={`Emotional TTS (${result.emotion})`}
                        isEmotional={true}
                        audioUrl={result.audio_url}
                      />
                    </div>
                    <div className="player-item">
                      <h3>Neutral Voice</h3>
                      <p>Standard robotic delivery</p>
                      <ComparisonPlayer
                        title="Baseline TTS (Neutral)"
                        isEmotional={false}
                        audioUrl={result.normal_audio_url}
                      />
                    </div>
                  </div>
                </section>

                <section className="insights-section">
                  <InsightsPanel config={result.voice_config} />
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
