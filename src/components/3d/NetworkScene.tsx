import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Create random points in 3D space
function generatePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());
    
    points[i3] = r * Math.sin(phi) * Math.cos(theta);
    points[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i3 + 2] = r * Math.cos(phi);
  }
  
  return points;
}

interface PointCloudProps {
  count: number;
  radius: number;
}

const PointCloud: React.FC<PointCloudProps> = ({ count, radius }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const rotationSpeed = 0.001;
  
  // Animation loop
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
    }
  });
  
  return (
    <Points ref={pointsRef} positions={generatePoints(count, radius)} stride={3}>
      <PointMaterial 
        transparent
        color="#00a2ff"
        size={0.4}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Main component
const NetworkScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Force re-render on resize
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          canvas.style.width = '100%';
          canvas.style.height = '100%';
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PointCloud count={2000} radius={10} />
        <PointCloud count={1000} radius={20} />
      </Canvas>
    </div>
  );
};

export default NetworkScene;