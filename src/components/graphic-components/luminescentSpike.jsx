import { useEffect, useRef} from 'react';
import { Vector3, Quaternion } from 'three';

const LuminescentSpike = ({ position, color, hoverColor }) => {
  const ref = useRef();

  const handleHover = (e) => {
    e.object.material.emissive.set(hoverColor); // Change color on hover
  };

  const handleHoverOut = (e) => {
    e.object.material.emissive.set(color); // Reset color
  };


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
      onPointerOver={handleHover}
      onPointerOut={handleHoverOut}>
        <coneGeometry args={[0.05, 0.5, 16]} />
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={1}
        />
    </mesh>
  );
};

export default LuminescentSpike;