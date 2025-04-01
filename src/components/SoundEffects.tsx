
import React, { useEffect } from 'react';
import SoundToggle from './sound/SoundToggle';
import { SoundProvider } from './sound/SoundContext';

interface SoundEffectsProps {}

// Define the window.playSound function
declare global {
  interface Window {
    playSound: (sound: string) => void;
  }
}

const SoundEffects: React.FC<SoundEffectsProps> = () => {
  useEffect(() => {
    // Initialize all audio elements
    const ambientSound = new Audio('/sounds/ambient.mp3');
    ambientSound.loop = true;  // Ensure ambient sound loops
    ambientSound.volume = 0.4; // Increased volume level

    const typingSound = new Audio('/sounds/typing.mp3');
    typingSound.volume = 0.3;  // Increased volume level

    const hoverSound = new Audio('/sounds/hover.mp3');
    hoverSound.volume = 0.25;  // Increased volume level

    const transitionSound = new Audio('/sounds/transition.mp3');
    transitionSound.volume = 0.35;  // Increased volume level

    const zapSound = new Audio('/sounds/zap.mp3');
    zapSound.volume = 0.3;  // Increased volume level

    // Create a collection of sounds
    const sounds = {
      ambient: ambientSound,
      typing: typingSound,
      hover: hoverSound,
      transition: transitionSound,
      zap: zapSound
    };

    let isMuted = true; // Start muted

    // Toggle mute state for all sounds
    const toggleMute = () => {
      isMuted = !isMuted;
      
      Object.values(sounds).forEach(sound => {
        sound.muted = isMuted;
      });
      
      // Start or stop ambient sound based on mute state
      if (!isMuted) {
        // Try to play ambient sound if not already playing
        try {
          if (ambientSound.paused) {
            // Set currentTime to 0 to ensure it always starts from the beginning when toggled
            ambientSound.currentTime = 0;
            ambientSound.play().catch(err => {
              console.log('Could not play ambient sound:', err);
            });
          }
        } catch (err) {
          console.log('Error playing ambient sound:', err);
        }
      } else {
        ambientSound.pause();
      }
      
      console.log(`Sound ${isMuted ? 'muted' : 'unmuted'}`);
    };

    // Function to play a specific sound
    const playSound = (soundName: string) => {
      if (isMuted) return;
      
      const sound = sounds[soundName as keyof typeof sounds];
      if (!sound) return;
      
      // For non-ambient sounds, we want to reset and play
      if (soundName !== 'ambient') {
        sound.currentTime = 0;
        sound.play().catch(err => {
          console.log(`Could not play ${soundName} sound:`, err);
        });
      }
      // For ambient, we just ensure it's playing and looping
      else if (sound.paused) {
        sound.loop = true; // Double ensure looping is enabled
        sound.play().catch(err => {
          console.log('Could not play ambient sound:', err);
        });
      }
    };

    // Make play function available globally
    window.playSound = playSound;

    // Add event listener to document for the sound toggle button
    document.addEventListener('sound-toggle', () => {
      toggleMute();
    });

    // Cleanup on unmount
    return () => {
      Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.src = '';
      });
      delete window.playSound;
      document.removeEventListener('sound-toggle', () => {});
    };
  }, []);

  return (
    <SoundProvider>
      <SoundToggle />
    </SoundProvider>
  );
};

export default SoundEffects;
