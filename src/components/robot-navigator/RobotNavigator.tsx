
import React from 'react';
import { RobotNavigatorProvider } from './RobotNavigatorContext';
import Robot from './Robot';
import ChargingPorts from './ChargingPorts';

const RobotNavigator: React.FC = () => {
  return (
    <RobotNavigatorProvider>
      <Robot />
      <ChargingPorts />
    </RobotNavigatorProvider>
  );
};

export default RobotNavigator;
