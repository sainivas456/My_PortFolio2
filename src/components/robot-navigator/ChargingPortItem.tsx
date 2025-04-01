
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChargingPort } from './types';
import { useRobotNavigator } from './RobotNavigatorContext';
import ChargingPortScene from './ChargingPortScene';

interface ChargingPortItemProps {
  port: ChargingPort;
}

const ChargingPortItem: React.FC<ChargingPortItemProps> = ({ port }) => {
  const { targetPort, isConnected, moveToPort, portsRef } = useRobotNavigator();
  const isActive = targetPort === port.id;
  
  const getPortPosition = () => {
    const portRect = portsRef.current[port.id];
    if (!portRect) return {};
    
    return {
      left: portRect.left + window.scrollX + 
        (port.position === 'right' ? portRect.width - 60 : 10) + 'px',
      top: portRect.top + window.scrollY + 
        (port.position === 'bottom' ? portRect.height - 60 : 30) + 'px'
    };
  };
  
  const getLabelPosition = () => {
    return {
      left: port.position === 'left' ? '3rem' : 
            port.position === 'right' ? 'auto' : '50%',
      right: port.position === 'right' ? '3rem' : 'auto',
      top: port.position === 'bottom' ? 'auto' : 
           port.position === 'top' ? '3rem' : '50%',
      bottom: port.position === 'bottom' ? '3rem' : 'auto',
      transform: ((port.position === 'left' || port.position === 'right') ? 'none' : 'translateX(-50%)') + 
                ((port.position === 'top' || port.position === 'bottom') ? ' translateY(-50%)' : '')
    };
  };
  
  // Connection socket effect
  const renderConnectionEffect = () => {
    if (isActive && isConnected) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-500 opacity-20 rounded-full animate-ping"></div>
          <div className="absolute w-6 h-6 bg-cyan-400 opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute w-3 h-3 bg-cyan-500 rounded-full"></div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div 
      className={cn(
        'fixed z-30 cursor-pointer',
        isActive ? 'scale-110' : 'scale-100',
        isActive && isConnected ? 'animate-pulse' : ''
      )}
      style={{
        ...getPortPosition(),
        transition: 'all 0.3s ease-out'
      }}
      onClick={() => moveToPort(port.id)}
      onMouseEnter={() => window.playSound && window.playSound('hover')}
    >
      <div className="cyber-port relative group">
        <div className="p-2 bg-cyber-dark border border-cyan-500/30 rounded-full shadow-neon-glow hover:shadow-lg hover:border-cyan-500/60 transition-all duration-300">
          {/* 3D Charging Port Scene */}
          <ChargingPortScene isActive={isActive && isConnected} position={port.position} />
          
          {/* Connection effect overlay */}
          {renderConnectionEffect()}
        </div>
        
        {/* Port Label */}
        <div 
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-cyber-secondary/90 border border-cyan-500/30 rounded px-2 py-1 text-xs text-cyan-400"
          style={getLabelPosition()}
        >
          <div className="flex items-center gap-1">
            <span>{port.label}</span>
            <ArrowRight size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingPortItem;
