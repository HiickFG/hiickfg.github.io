import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Torus = ({
    children, 
    onHoverStart, 
    onHoverEnd,
    visualConfig = {
        color: "darkgrey",
        emissiveColor: "darkorange",
        emissiveIntensity: 1,
        hoverColor: "red",
        metalness: 1,
        opacity: 0.8,
        roughness: 0,
        transparent: true
    },
    rotation = {
        angles: [Math.PI/4, Math.PI/4, 0],
        order: "YXZ"     // Specify the rotation order (Y first, then X, then Z)
    },
    rotationSpeed = {
        x: 0.005,
        y: 0.005,
        z: 0.05
    },
    torusSpecs = [1, 0.01, 16, 100, Math.PI/2]
}) => {
    const [autoRotate, setAutoRotate] = useState(true);
    const ref = useRef();

    const handleHoverStart = (e, setColor) => { setAutoRotate(false); onHoverStart(e, setColor); };
    const handleHoverEnd = (e) => { setAutoRotate(true); onHoverEnd(e); };

    useFrame(() => {
        if (ref.current) ref.current.rotation.order = rotation.order;

        if (ref.current && autoRotate) {
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
            rotation={rotation.angles}
        >
            <torusGeometry args={torusSpecs} />
            <meshPhysicalMaterial 
                color={visualConfig.color}
                emissive={visualConfig.emissiveColor}
                emissiveIntensity={visualConfig.emissiveIntensity}
                roughness={visualConfig.roughness} 
                metalness={visualConfig.metalness}
                transparent={visualConfig.transparent}
                opacity={visualConfig.opacity}
            />
            {children}
        </mesh>
    );
}

export default Torus;