import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const StubbleParticle = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#d4af37" roughness={0.8} />
      </mesh>
    </Float>
  );
};

const StubbleBale = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        {/* Cylindrical bale */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 1, 16]} />
          <meshStandardMaterial color="#c9a961" roughness={0.9} />
        </mesh>
        {/* Binding straps */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 0.05, 16]} />
          <meshStandardMaterial color="#2f7d32" />
        </mesh>
        <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 0.05, 16]} />
          <meshStandardMaterial color="#2f7d32" />
        </mesh>
      </group>
    </Float>
  );
};

export const FloatingStubble = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#f4d03f" />
          
          {/* Stubble particles */}
          <StubbleParticle position={[-1, 0, 0]} />
          <StubbleParticle position={[1, 0.5, 0]} />
          <StubbleParticle position={[0, -0.5, 1]} />
          <StubbleParticle position={[-0.5, 0.3, -1]} />
          
          {/* Stubble bales */}
          <StubbleBale position={[0, 0, 0]} />
          <StubbleBale position={[2, -0.5, -1]} />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
