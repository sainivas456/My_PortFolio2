
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ChargingPortSceneProps {
  isActive: boolean;
  position: 'left' | 'right' | 'top' | 'bottom';
}

const ChargingPortModel: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <group>
      {/* Base plate */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Port socket */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.8} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Connection points */}
      <mesh position={[0, 0.26, 0]} receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#00ffaa" : "#1a5c7e"} 
          emissive={isActive ? "#00ffaa" : "#1a5c7e"} 
          emissiveIntensity={isActive ? 0.8 : 0.2} 
          toneMapped={false}
        />
      </mesh>
      
      {/* Energy ring */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI/2, 0, 0]} receiveShadow>
        <torusGeometry args={[0.4, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color={isActive ? "#00ffaa" : "#1a5c7e"} 
          emissive={isActive ? "#00ffaa" : "#1a5c7e"} 
          emissiveIntensity={isActive ? 0.5 : 0.1} 
        />
      </mesh>
    </group>
  );
};

const ChargingPortScene: React.FC<ChargingPortSceneProps> = ({ isActive, position }) => {
  // Determine light position based on port position
  const getLightPosition = (): [number, number, number] => {
    switch(position) {
      case 'left': return [1, 1, 1];
      case 'right': return [-1, 1, 1];
      case 'top': return [0, -1, 1];
      case 'bottom': return [0, 1, 1];
      default: return [1, 1, 1];
    }
  };
  
  return (
    <div className="w-16 h-16">
      <Canvas 
        shadows 
        camera={{ position: [0, 1, 3], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight 
          intensity={1} 
          position={getLightPosition()} 
          castShadow 
          shadow-mapSize-width={512} 
          shadow-mapSize-height={512}
        />
        
        <ChargingPortModel isActive={isActive} />
        
        {/* Energy particles when active */}
        {isActive && (
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={30}
                array={Float32Array.from(Array(90).fill(0).map(() => (Math.random() - 0.5) * 1.5))}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial 
              size={0.04} 
              color="#00ffaa" 
              sizeAttenuation 
              transparent 
              opacity={0.6}
            />
          </points>
        )}
        
        {/* Minimal orbit controls just for subtle interactions */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI/3}
          maxPolarAngle={Math.PI/2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ChargingPortScene;
