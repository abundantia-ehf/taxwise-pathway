
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const SpinningGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create the wireframe material with the brand color
  const material = new THREE.MeshBasicMaterial({
    color: '#D1FF82',
    wireframe: true,
    transparent: true,
    opacity: 0.8,
  });

  // Animate the rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Globe = () => {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas>
        <ambientLight intensity={0.5} />
        <SpinningGlobe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Globe;
