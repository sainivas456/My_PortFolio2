
import React, { useEffect, useState } from 'react';
import { Bot, Zap, Plug, BatteryCharging } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRobotNavigator } from './RobotNavigatorContext';
import RobotScene from './RobotScene';

const Robot: React.FC = () => {
  const { robotPosition, isMoving, isConnected, targetPort } = useRobotNavigator();
  const [showPlugAnimation, setShowPlugAnimation] = useState(false);
  
  // Handle plug-in animation when connecting
  useEffect(() => {
    if (isConnected) {
      setShowPlugAnimation(true);
      // Play connection sound
      if (window.playSound) {
        window.playSound('transition');
      }
    } else {
      // Delay hiding the animation to complete the visual effect
      const timer = setTimeout(() => {
        setShowPlugAnimation(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  return (
    <div 
      className={cn(
        'fixed z-40 cursor-pointer transition-all duration-1000',
        isMoving && 'animate-pulse',
        isConnected && 'filter brightness-150'
      )}
      style={{ 
        left: `${robotPosition.x}px`, 
        top: `${robotPosition.y}px`,
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onClick={() => window.playSound && window.playSound('hover')}
    >
      <div className="relative">
        {/* 3D Robot Scene */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2">
          <RobotScene isConnected={isConnected} isMoving={isMoving} />
        </div>
        
        {/* Connection animation */}
        {showPlugAnimation && (
          <div className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10",
            isConnected ? "animate-ping" : "opacity-0 transition-opacity duration-500"
          )}>
            <div className="relative">
              <Plug size={24} className="text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400 opacity-30 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
        
        {/* Charging indicator */}
        {isConnected && (
          <div className="absolute -top-4 -right-4 animate-pulse">
            <BatteryCharging size={20} className="text-green-400 drop-shadow-glow" />
          </div>
        )}
        
        {/* Energy beam when moving to connect */}
        {isMoving && targetPort && !isConnected && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-transparent to-transparent animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Robot;
