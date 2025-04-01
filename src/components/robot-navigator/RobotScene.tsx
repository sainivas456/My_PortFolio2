
import React from 'react';
import { Canvas } from '@react-three/fiber';
import RobotModel from './RobotModel';

interface RobotSceneProps {
  isConnected: boolean;
  isMoving: boolean;
}

const RobotScene: React.FC<RobotSceneProps> = ({ isConnected, isMoving }) => {
  return (
    <div className="w-20 h-20">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <spotLight 
          position={[0, 5, 5]} 
          intensity={0.8} 
          angle={0.3} 
          penumbra={0.5} 
          castShadow
        />
        
        <RobotModel isConnected={isConnected} isMoving={isMoving} />
      </Canvas>
    </div>
  );
};

export default RobotScene;
