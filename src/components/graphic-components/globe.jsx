// Scripts
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import LuminescentSpike from './luminescentSpike';

const RotatingSphere = ({ children, onHoverStart, onHoverEnd, color }) => {
  return (
    <mesh
      onPointerOver={onHoverStart}
      onPointerOut={onHoverEnd}
      rotation={[Math.PI / 9, 0, 0]}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.5} 
        metalness={0.3}
        transparent={true}
        opacity={0.5}/>
      {children}
    </mesh>
  );
};

const Globe = ({ spots, hoverColor, color, hoverInFcn, hoverOutFcn }) => {
    const [autoRotate, setAutoRotate] = useState(true);

    const handleHoverStart = (e, setColor) => { setAutoRotate(false); hoverInFcn(e, setColor); };
    const handleHoverEnd = (e) => { setAutoRotate(true); hoverOutFcn(e); };

    return (
        <div className="globe-container">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={1} />
                <Environment preset="night" />
                <RotatingSphere
                    onHoverStart={(e) => handleHoverStart(e, hoverColor)}
                    onHoverEnd={handleHoverEnd}
                    color={color}
                >
                {spots.map((spot, index) => (
                    <LuminescentSpike
                    key={index}
                    position={spot.position}
                    color={spot.color}
                    emissiveColor={spot.emissiveColor}
                    hoverColor = "orange"
                    hoverInFcn={handleHoverStart}
                    hoverOutFcn={handleHoverEnd}
                    />
                ))}
                </RotatingSphere>
                <OrbitControls 
                        rotateSpeed={0.5}
                        enableZoom={true}
                        enablePan={false}
                        enableRotate={true}
                        autoRotate={autoRotate}
                        minDistance={2}
                        maxDistance={10}
                    />
            </Canvas>
        </div>
    );
};

export default Globe;