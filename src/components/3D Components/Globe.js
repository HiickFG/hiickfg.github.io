// Scripts
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import LuminescentSpike from './LuminescentSpike';

// Styles
import '../../styles/3D Components/Globe.css';

const RotatingSphere = ({ children, onHoverStart, onHoverEnd }) => {
  return (
    <mesh
        onPointerOver={onHoverStart}
        onPointerOut={onHoverEnd}
        rotation={[Math.PI / 9, 0, 0]}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial 
        color="red" 
        roughness={0.5} 
        metalness={0.3}
        transparent={true}
        opacity={0.5}/>
      {children}
    </mesh>
  );
};

const Globe = ({ spots }) => {
    const [autoRotate, setAutoRotate] = useState(true);

    const handleHoverStart = () => setAutoRotate(false);
    const handleHoverEnd = () => setAutoRotate(true);

    return (
        <div className="globe-container">
            <Canvas>
                <ambientLight intensity={1} />
                <Environment preset="night" />
                <RotatingSphere
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                >
                {spots.map((spot, index) => (
                    <LuminescentSpike
                    key={index}
                    position={spot.position}
                    color={spot.color}
                    hoverColor = "red"
                    />
                ))}
                </RotatingSphere>
                <OrbitControls 
                        rotateSpeed={0.5}
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={true}
                        autoRotate={autoRotate}
                    />
            </Canvas>
        </div>
    );
};

export default Globe;