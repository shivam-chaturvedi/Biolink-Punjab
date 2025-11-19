import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import { Suspense } from 'react';

const Tractor = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Tractor body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.8, 1]} />
          <meshStandardMaterial color="#2f7d32" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Cabin */}
        <mesh position={[0.3, 0.6, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.9]} />
          <meshStandardMaterial color="#1b5e20" metalness={0.2} roughness={0.8} />
        </mesh>
        
        {/* Front wheel */}
        <mesh position={[0.6, -0.5, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.6, -0.5, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Back wheel */}
        <mesh position={[-0.6, -0.4, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.6, -0.4, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </Float>
  );
};

const WheatStalk = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Stem */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.03, 1.5, 8]} />
          <meshStandardMaterial color="#d4af37" />
        </mesh>
        
        {/* Wheat head */}
        <mesh position={[0, 0.8, 0]}>
          <coneGeometry args={[0.08, 0.3, 8]} />
          <meshStandardMaterial color="#f4d03f" />
        </mesh>
      </group>
    </Float>
  );
};

const FarmField = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#4a7c59" roughness={0.9} />
    </mesh>
  );
};

export const FarmScene = () => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-large">
      <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#f4d03f" />
          
          {/* Stars background */}
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          
          {/* 3D Elements */}
          <Tractor />
          <WheatStalk position={[-2, 0, 1]} />
          <WheatStalk position={[-1.5, 0, 2]} />
          <WheatStalk position={[-2.5, 0, 1.5]} />
          <WheatStalk position={[2, 0, 1]} />
          <WheatStalk position={[2.5, 0, 0.5]} />
          <FarmField />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
