import useRef from 'react';
import { useFrame } from '@react-three/fiber';

const StaticLight = () => {
    const lightRef = useRef();

    useFrame(() => {
        if (lightRef.current){
            lightRef.current.position.set(0, 0, 5);
        }
    });

    return (
        <directionalLight
            ref={lightRef} 
            intensity={1.5}
            target={[0, 0, 0]}
            castShadow
        />
    );
};

export default StaticLight;