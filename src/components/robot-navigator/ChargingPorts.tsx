
import React from 'react';
import ChargingPortItem from './ChargingPortItem';
import { useRobotNavigator } from './RobotNavigatorContext';

const ChargingPorts: React.FC = () => {
  const { chargingPorts } = useRobotNavigator();
  
  return (
    <>
      {chargingPorts.map((port) => (
        <ChargingPortItem key={port.id} port={port} />
      ))}
    </>
  );
};

export default ChargingPorts;
