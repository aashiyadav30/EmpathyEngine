import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import './InputArea.css';

export default function InputArea({ onAnalyze, isProcessing }) {
  const [text, setText] = useState('I am incredibly excited to announce the launch of our new product today!');

  const handleAnalyze = () => {
    if (text.trim() && !isProcessing) {
      onAnalyze(text);
    }
  };

  return (
    <div className="input-area">
      <div className="input-header">
        <h2>Describe the feeling</h2>
        <p className="input-copy">Enter text to detect emotion and synthesize voice.</p>
      </div>

      <textarea
        className="text-input"
        placeholder="Type something emotional here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
      />

      <div className="input-actions">
        <button
          className="btn-primary"
          onClick={handleAnalyze}
          disabled={!text.trim() || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="loading-spinner" size={16} />
              Generating...
            </>
          ) : (
            <>Analyze & Generate Audio</>
          )}
        </button>
      </div>
    </div>
  );
}
