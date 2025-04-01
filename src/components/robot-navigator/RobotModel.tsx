
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Battery, BatteryFull, Plug, Zap } from 'lucide-react';
import * as THREE from 'three';

interface RobotModelProps {
  isConnected: boolean;
  isMoving: boolean;
}

const RobotModel: React.FC<RobotModelProps> = ({ isConnected, isMoving }) => {
  const robotRef = useRef<THREE.Group>(null);
  const plugRef = useRef<THREE.Group>(null);
  
  // Animation parameters
  const rotationSpeed = useMemo(() => new THREE.Vector3(0.01, 0.005, 0), []);
  const floatSpeed = useMemo(() => 0.01, []);
  const floatAmplitude = useMemo(() => 0.05, []);
  
  // Animation frame
  useFrame((state, delta) => {
    if (!robotRef.current) return;
    
    // Floating animation
    if (!isConnected) {
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude;
    } else {
      // When connected, stabilize position
      robotRef.current.position.y = 0;
    }
    
    // Moving animation
    if (isMoving) {
      robotRef.current.rotation.y += rotationSpeed.y * 2;
    } else if (!isConnected) {
      // Idle animation when not connected and not moving
      robotRef.current.rotation.y += rotationSpeed.y * 0.5;
    }
    
    // Connection animation
    if (isConnected && plugRef.current) {
      // Extend the plug when connected
      plugRef.current.position.z = THREE.MathUtils.lerp(plugRef.current.position.z, 0.5, 0.1);
      plugRef.current.rotation.z = THREE.MathUtils.lerp(plugRef.current.rotation.z, Math.PI / 2, 0.1);
    } else if (plugRef.current) {
      // Retract the plug when disconnected
      plugRef.current.position.z = THREE.MathUtils.lerp(plugRef.current.position.z, 0, 0.1);
      plugRef.current.rotation.z = THREE.MathUtils.lerp(plugRef.current.rotation.z, 0, 0.1);
    }
  });

  return (
    <group ref={robotRef}>
      {/* Robot body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Robot head */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.3]} />
        <meshStandardMaterial color="#0f3460" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Robot eyes */}
      <mesh position={[-0.15, 0.6, 0.2]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={isConnected ? "#00ff00" : (isMoving ? "#ffaa00" : "#00aaff")} 
          emissive={isConnected ? "#00ff00" : (isMoving ? "#ffaa00" : "#00aaff")} 
          emissiveIntensity={0.5} 
        />
      </mesh>
      <mesh position={[0.15, 0.6, 0.2]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={isConnected ? "#00ff00" : (isMoving ? "#ffaa00" : "#00aaff")} 
          emissive={isConnected ? "#00ff00" : (isMoving ? "#ffaa00" : "#00aaff")}
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* Robot plug extension */}
      <group ref={plugRef} position={[0, 0, -0.2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial color="#e94560" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Battery indicators */}
      {isConnected && (
        <group position={[0, -0.1, 0.25]}>
          <mesh>
            <planeGeometry args={[0.4, 0.2]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.3, 0.15]} />
            <meshStandardMaterial 
              color="#00ff00" 
              emissive="#00ff00"
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
        </group>
      )}
      
      {/* Energy particles when connected */}
      {isConnected && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={50}
              array={Float32Array.from(Array(150).fill(0).map(() => (Math.random() - 0.5) * 2))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial 
            size={0.05} 
            color="#00ffff" 
            sizeAttenuation 
            transparent 
            opacity={0.8}
          />
        </points>
      )}
    </group>
  );
};

export default RobotModel;
