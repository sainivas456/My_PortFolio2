
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Sound } from './types';

interface SoundContextType {
  isMuted: boolean;
  isInitialized: boolean;
  toggleMute: () => void;
  playSound: (soundId: string) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  
  // Available sounds
  const sounds: Sound[] = [
    {
      id: 'ambient',
      src: '/Sounds/ambient.mp3',
      volume: 0.30,
      loop: true
    },
    {
      id: 'typing',
      src: '/Sounds/typing.mp3',
      volume: 0.2
    },
    {
      id: 'hover',
      src: '/Sounds/hover.mp3',
      volume: 0
    },
    {
      id: 'transition',
      src: '/Sounds/transition.mp3',
      volume: 0.25
    },
    {
      id: 'zap',
      src: '/Sounds/zap.mp3',
      volume: 0.3
    }
  ];

  // Initialize audio elements
  useEffect(() => {
    console.log("Initializing sound system with these sound files:");
    sounds.forEach(sound => {
      console.log(`Sound ${sound.id}: ${sound.src}`);
      
      const audio = new Audio();
      
      // Set source and other properties
      audio.src = sound.src;
      audio.volume = sound.volume;
      if (sound.loop) {
        audio.loop = true;
      }
      
      // Add error handling
      audio.onerror = (e) => {
        console.error(`Error loading audio (${sound.id}):`, e);
        console.error(`Failed to load sound file: ${sound.src}`);
      };
      
      audioRefs.current[sound.id] = audio;
      
      // Preload the audio
      audio.load();
    });

    // Log to confirm initialization
    console.log("Sound effects initialized");

    return () => {
      // Clean up audio elements
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  // Initialize sound system when user interacts with the page
  const initializeAudio = () => {
    if (!isInitialized) {
      setIsMuted(false);
      setIsInitialized(true);
      
      console.log("Sound system activated by user interaction");
      
      // Play ambient sound
      const ambientSound = audioRefs.current['ambient'];
      if (ambientSound) {
        ambientSound.play()
          .then(() => console.log("Ambient sound playing"))
          .catch(e => console.error('Audio play failed:', e));
      }
      
      // Remove event listeners after initialization
      document.removeEventListener('click', initializeAudio);
      document.removeEventListener('scroll', initializeAudio);
    }
  };

  useEffect(() => {
    // Add event listeners for user interaction
    document.addEventListener('click', initializeAudio);
    document.addEventListener('scroll', initializeAudio);
    
    return () => {
      document.removeEventListener('click', initializeAudio);
      document.removeEventListener('scroll', initializeAudio);
    };
  }, [isInitialized]);

  // Expose global method to play sounds
  useEffect(() => {
    window.playSound = (soundId: string) => {
      if (isMuted || !isInitialized) return;
      
      const sound = audioRefs.current[soundId];
      if (sound) {
        // Reset the audio to the beginning if it's already playing
        sound.currentTime = 0;
        sound.play()
          .then(() => console.log(`Sound played: ${soundId}`))
          .catch(e => console.error(`Failed to play ${soundId}:`, e));
      }
    };
    
    return () => {
      // @ts-ignore
      window.playSound = undefined;
    };
  }, [isMuted, isInitialized]);

  const toggleMute = () => {
    setIsMuted(prev => {
      const newState = !prev;
      console.log(`Sound ${newState ? 'muted' : 'unmuted'}`);
      
      Object.values(audioRefs.current).forEach(audio => {
        if (newState) {
          audio.pause();
        } else if (audio === audioRefs.current['ambient']) {
          audio.play().catch(e => console.error('Audio play failed:', e));
        }
      });
      
      return newState;
    });
  };

  // Method to play a sound directly from the context
  const playSound = (soundId: string) => {
    if (isMuted || !isInitialized) return;
    
    const sound = audioRefs.current[soundId];
    if (sound) {
      sound.currentTime = 0;
      sound.play()
        .then(() => console.log(`Sound played: ${soundId}`))
        .catch(e => console.error(`Failed to play ${soundId}:`, e));
    } else {
      console.error(`Sound not found: ${soundId}`);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, isInitialized, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};
