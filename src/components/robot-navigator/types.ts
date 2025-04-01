
import { ReactNode } from 'react';

export interface ChargingPort {
  id: string;
  label: string;
  position: 'left' | 'right' | 'top' | 'bottom';
}

export interface RobotPositionState {
  x: number;
  y: number;
}

export interface PortPositions {
  [key: string]: DOMRect;
}

export interface RobotNavigatorContextType {
  robotPosition: RobotPositionState;
  targetPort: string | null;
  isConnected: boolean;
  isMoving: boolean;
  chargingPorts: ChargingPort[];
  moveToPort: (portId: string) => void;
  portsRef: React.MutableRefObject<PortPositions>;
}

export interface RobotNavigatorProviderProps {
  children: ReactNode;
}

export const DEFAULT_CHARGING_PORTS: ChargingPort[] = [
  { id: 'about', label: 'About', position: 'left' },
  { id: 'experience', label: 'Experience', position: 'right' },
  { id: 'skills', label: 'Skills', position: 'left' },
  { id: 'projects', label: 'Certifications', position: 'right' },
  { id: 'contact', label: 'Contact', position: 'bottom' },
];
