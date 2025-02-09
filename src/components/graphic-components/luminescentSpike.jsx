import { useEffect, useRef} from 'react';
import { Vector3, Quaternion } from 'three';

const LuminescentSpike = ({ position, color, emissiveColor, hoverColor, hoverInFcn, hoverOutFcn }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      // Calculate the direction vector (normalized position)
      const direction = new Vector3(...position).normalize();

      // Create a quaternion to align the cone's up axis (Y) with the direction vector
      const quaternion = new Quaternion();
      quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction); // Align Y-axis to direction

      // Apply the quaternion rotation to the mesh
      ref.current.quaternion.copy(quaternion);

      const offsetDistance = 0.5;
      const offsetPosition = direction.clone().multiplyScalar(offsetDistance);

      // Apply the offset to the cone's position
      ref.current.position.set(
        position[0] + offsetPosition.x,
        position[1] + offsetPosition.y,
        position[2] + offsetPosition.z
      );
    }
  }, [position]);

  return (
    <mesh 
      ref={ref} 
      position={position}
      onPointerOver={(e) => hoverInFcn(e, hoverColor)}
      onPointerOut={hoverOutFcn}>
        <coneGeometry args={[0.05, 0.5, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={1}
          metalness={1}
          opacity={0.8}
          roughness={0}
          transparent={true}
        />
    </mesh>
  );
};

export default LuminescentSpike;