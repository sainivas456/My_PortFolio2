
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { 
  ChargingPort, 
  RobotPositionState, 
  PortPositions, 
  RobotNavigatorContextType,
  RobotNavigatorProviderProps,
  DEFAULT_CHARGING_PORTS
} from './types';

// Create context with a default undefined value
const RobotNavigatorContext = createContext<RobotNavigatorContextType | undefined>(undefined);

export const RobotNavigatorProvider: React.FC<RobotNavigatorProviderProps> = ({ children }) => {
  const [robotPosition, setRobotPosition] = useState<RobotPositionState>({ x: 0, y: 0 });
  const [targetPort, setTargetPort] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const portsRef = useRef<PortPositions>({});
  const chargingPorts = DEFAULT_CHARGING_PORTS;
  const connectionTimerRef = useRef<number | null>(null);

  // Initialize robot position after components are mounted
  useEffect(() => {
    const initRobot = () => {
      // Start at the top center of the page, just below hero section
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setRobotPosition({
          x: window.innerWidth / 2 - 20,
          y: heroRect.height - 40
        });
      }
    };

    // Update port positions
    const updatePortPositions = () => {
      chargingPorts.forEach(port => {
        const section = document.getElementById(port.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          portsRef.current[port.id] = rect;
        }
      });
    };

    // Initialize after everything is loaded
    setTimeout(() => {
      initRobot();
      updatePortPositions();
    }, 1000);

    // Handle resize
    window.addEventListener('resize', updatePortPositions);
    
    return () => {
      window.removeEventListener('resize', updatePortPositions);
      // Clear any pending timers
      if (connectionTimerRef.current) {
        clearTimeout(connectionTimerRef.current);
      }
    };
  }, []);

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (connectionTimerRef.current) {
        clearTimeout(connectionTimerRef.current);
      }
    };
  }, []);

  // Move robot to charging port with enhanced animation
  const moveToPort = (portId: string) => {
    const portRect = portsRef.current[portId];
    if (!portRect) return;
    
    // Calculate target position based on port position
    const port = chargingPorts.find(p => p.id === portId);
    if (!port) return;
    
    let targetX = 0;
    let targetY = 0;
    
    switch (port.position) {
      case 'left':
        targetX = portRect.left + window.scrollX;
        targetY = portRect.top + window.scrollY + (portRect.height / 4);
        break;
      case 'right':
        targetX = portRect.right + window.scrollX - 60;
        targetY = portRect.top + window.scrollY + (portRect.height / 4);
        break;
      case 'top':
        targetX = portRect.left + window.scrollX + (portRect.width / 2) - 30;
        targetY = portRect.top + window.scrollY;
        break;
      case 'bottom':
        targetX = portRect.left + window.scrollX + (portRect.width / 2) - 30;
        targetY = portRect.bottom + window.scrollY - 60;
        break;
    }
    
    setTargetPort(portId);
    setIsMoving(true);
    
    // Play movement sound
    if (window.playSound) {
      window.playSound('transition');
    }
    
    // Simulate robot movement with transition
    setRobotPosition({ x: targetX, y: targetY });
    
    // Clean up any existing timer
    if (connectionTimerRef.current) {
      clearTimeout(connectionTimerRef.current);
    }
    
    // Simulate connection sequence after movement is complete
    connectionTimerRef.current = window.setTimeout(() => {
      setIsMoving(false);
      
      // Connection animation sequence
      setTimeout(() => {
        // Play connection sound
        if (window.playSound) {
          window.playSound('transition');
        }
        
        setIsConnected(true);
        
        // Navigate to section after connection
        setTimeout(() => {
          const section = document.getElementById(portId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
          
          // Reset connection after navigation
          setTimeout(() => {
            setIsConnected(false);
            
            // Small delay before fully resetting target
            setTimeout(() => {
              setTargetPort(null);
            }, 500);
          }, 2000); // Extended connection time for better visual effect
        }, 800);
      }, 200);
    }, 1000);
  };

  // Context value
  const value: RobotNavigatorContextType = {
    robotPosition,
    targetPort,
    isConnected,
    isMoving,
    chargingPorts,
    moveToPort,
    portsRef
  };

  return (
    <RobotNavigatorContext.Provider value={value}>
      {children}
    </RobotNavigatorContext.Provider>
  );
};

// Hook to use the context
export const useRobotNavigator = (): RobotNavigatorContextType => {
  const context = useContext(RobotNavigatorContext);
  if (context === undefined) {
    throw new Error('useRobotNavigator must be used within a RobotNavigatorProvider');
  }
  return context;
};
