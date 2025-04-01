import React, { useEffect, useState } from 'react';
import { useSoundContext } from './SoundContext';

const SoundToggle: React.FC = () => {
  const { isMuted, toggleMute, isInitialized, playSound } = useSoundContext();
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Show a temporary status message when sound is toggled
  useEffect(() => {
    if (showStatus) {
      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showStatus]);

  const handleToggle = () => {
    toggleMute();
    setStatusMessage(`Sound ${isMuted ? 'Enabled' : 'Muted'}`);
    setShowStatus(true);
    
    // Play a test sound if unmuting
    if (isMuted && isInitialized) {
      setTimeout(() => {
        console.log("Attempting to play test zap sound");
        playSound('zap');
      }, 100);
    }
  };

  /*
  // Debug function to check if sound files exist
  const checkSoundFiles = () => {
    const soundFiles = [
      '/sounds/ambient.mp3',
      '/sounds/typing.mp3',
      '/sounds/hover.mp3',
      '/sounds/transition.mp3',
      '/sounds/zap.mp3'
    ];
    
    setStatusMessage('Checking sound files...');
    setShowStatus(true);
    
    Promise.all(
      soundFiles.map(src => 
        fetch(src)
          .then(response => {
            if (!response.ok) {
              throw new Error(`File ${src} not found (${response.status})`);
            }
            return `${src} ✓`;
          })
          .catch(error => `${src} ✗ (${error.message})`)
      )
    ).then(results => {
      console.log('Sound file check results:', results);
      const missingFiles = results.filter(r => r.includes('✗'));
      
      if (missingFiles.length > 0) {
        setStatusMessage(`Missing ${missingFiles.length} sound files!`);
      } else {
        setStatusMessage('All sound files found!');
        // Try playing the zap sound
        if (isInitialized) {
          setTimeout(() => playSound('zap'), 500);
        }
      }
      
      // Keep the message visible longer for the check
      setTimeout(() => setShowStatus(false), 5000);
    });
  };
  */

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {showStatus && (
        <div className="mb-2 px-3 py-1 bg-cyber-dark/90 border border-yellow-500/60 rounded text-sm text-yellow-400 transition-all">
          {statusMessage || `Sound ${isMuted ? 'Muted' : 'Enabled'}`}
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          className="p-2 bg-cyber-secondary/80 border border-yellow-500/60 rounded-full hover:bg-yellow-900/30 transition-all relative"
          aria-label={isMuted ? "Enable sound" : "Mute sound"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          )}
          {isInitialized && !isMuted && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SoundToggle;
