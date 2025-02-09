// Scripts
import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import LuminescentSpike from './luminescentSpike';
import Sphere from './sphere';
import OrbitingBody from './orbitingBody';
import Torus from './torus';
import Trail from './trail';

const SolarSystem = ({ spots, hoverInFcn, hoverOutFcn, torusArcs }) => {
    const [autoRotate, setAutoRotate] = useState(true);
    const [cameraZ] = useState(window.innerWidth > window.innerHeight ? 5 : 7);

    const handleHoverStart = (e, setColor) => { setAutoRotate(false); hoverInFcn(e, setColor); };
    const handleHoverEnd = (e) => { setAutoRotate(true); hoverOutFcn(e); };

    const mainOrbitRef = useRef();
    const trailOrbitRef = useRef();

    return (
        <div className="solar-container">
            <Canvas camera={{ position: [0, 0, cameraZ] }}>
                <ambientLight intensity={1} />
                <Environment preset="night" />
                <OrbitingBody a={0} b={0} ref={mainOrbitRef}>
                    <Sphere onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} autoRotate={autoRotate}>
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
                    </Sphere>
                    {torusArcs.map((torusArc, index) => (
                        <Torus 
                            key={index}
                            rotation={{
                                angles: torusArc.rotation,
                                order: torusArc.order
                            }}
                            visualConfig={{
                                color: 'darkgrey',
                                emissiveColor: 'darkorange',
                                emissiveIntensity: 1,
                                metalness: 1,
                                opacity: 0.8,
                                roughness: 0,
                                transparent: true
                            }}
                        />
                    ))}
                </OrbitingBody>
                <OrbitingBody speed={0.5} inclination={10} ref={trailOrbitRef}>
                    <Sphere onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} visualConfig = {{
                        color: "orange",
                        emissiveColor: "orange",
                        emissiveIntensity: 0.3,
                        hoverColor: "darkorange",
                        metalness: 0.3,
                        opacity: 0.5,
                        radiusGrid: [0.1, 64, 64],
                        rotation: [Math.PI / 9, 0, 0],
                        roughness: 0.5,
                        transparent: true
                    }}></Sphere>
                </OrbitingBody>
                <Trail parentRef={trailOrbitRef} fadeDuration={5} maxPoints={20000} delay={0.05}/>

                <OrbitControls 
                        enableZoom={true}
                        enablePan={false}
                        minDistance={2}
                        maxDistance={10}
                    />
            </Canvas>
        </div>
    );
};

export default SolarSystem;