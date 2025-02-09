import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";

const OrbitingBody = forwardRef(({ 
    a = 5, // Semi-major axis (longer axis)
    b = 3, // Semi-minor axis (shorter axis)
    speed = 0.5, // Orbiting speed
    inclination = 0, // Angle in degrees for tilted orbits
    children
}, ref) => {
    const [autoRotate, setAutoRotate] = useState(true);
    const localRef = useRef();
    let angle = 0;

    // Expose the localRef to the parent via the forwarded ref
    useImperativeHandle(ref, () => localRef.current);

    useFrame(({ clock }) => {
        if (!autoRotate) return;

        angle = clock.getElapsedTime() * speed;

        // Convert inclination from degrees to radians
        const radInclination = (inclination * Math.PI) / 180;

        // Elliptical motion
        const x = Math.cos(angle) * a; // Major axis
        const z = Math.sin(angle) * b; // Minor axis

        // Apply inclination (tilted orbit)
        localRef.current.position.x = x;
        localRef.current.position.z = z * Math.cos(radInclination);
        localRef.current.position.y = z * Math.sin(radInclination);
    });

    return (
        <group 
            ref={localRef} 
            onPointerOver={() => setAutoRotate(false)} 
            onPointerOut={() => setAutoRotate(true)}
        >
            {children}
        </group>
    );
});

export default OrbitingBody;