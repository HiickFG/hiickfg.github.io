import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Sphere = ({
    children, 
    onHoverStart, 
    onHoverEnd,
    visualConfig = {
        color: "darkred",
        emissiveColor: "darkred",
        emissiveIntensity: 0.3,
        hoverColor: "red",
        metalness: 0.3,
        opacity: 0.5,
        radiusGrid: [0.25, 64, 64],
        rotation: [Math.PI / 9, 0, 0],
        roughness: 0.5,
        rotationSpeed: {
            x: 0,
            y: 0.001,
            z: 0
        },
        transparent: true
    }
}) => {
    const [autoRotate, setAutoRotate] = useState(true);
    const ref = useRef();

    const handleHoverStart = (e, setColor) => { setAutoRotate(false); onHoverStart(e, setColor); };
    const handleHoverEnd = (e) => { setAutoRotate(true); onHoverEnd(e); };

    useFrame(() => {
        if (ref.current && autoRotate) {
            const { rotationSpeed = { x: 0, y: 0, z: 0 } } = visualConfig;
            ref.current.rotation.x += rotationSpeed.x;
            ref.current.rotation.y += rotationSpeed.y;
            ref.current.rotation.z += rotationSpeed.z;
        }
    });

    return (
        <mesh
            ref={ref}
            onPointerOver={(e) => handleHoverStart(e, visualConfig.hoverColor)}
            onPointerOut={handleHoverEnd}
            rotation={visualConfig.rotation}
        >
          <sphereGeometry args={visualConfig.radiusGrid} />
          <meshPhysicalMaterial 
            color={visualConfig.color}
            emissive={visualConfig.emissiveColor}
            emissiveIntensity={visualConfig.emissiveIntensity}
            roughness={visualConfig.roughness} 
            metalness={visualConfig.metalness}
            transparent={visualConfig.transparent}
            opacity={visualConfig.opacity}/>
          {children}
        </mesh>
      );
}

export default Sphere;