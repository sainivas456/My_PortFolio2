
import React from 'react';
import { SoundProvider } from './SoundContext';
import SoundToggle from './SoundToggle';

const SoundEffects: React.FC = () => {
  return (
    <SoundProvider>
      <SoundToggle />
    </SoundProvider>
  );
};

// Add global type definition for window
declare global {
  interface Window {
    playSound: (soundId: string) => void;
  }
}

export default SoundEffects;
