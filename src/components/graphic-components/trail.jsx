import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Trail = ({ parentRef, maxPoints = 100, fadeDuration = 2.0, delay=0.5 }) => {
  const geometryRef = useRef();
  // Preallocate arrays for positions and colors:
  const positions = new Float32Array(maxPoints * 3);
  const colors = new Float32Array(maxPoints * 4); // RGBA per vertex
  // Maintain a history of positions with their timestamps.
  const history = [];

  useFrame((state) => {
    if (parentRef.current) {
      // Record current position with its timestamp.
      history.push({ pos: parentRef.current.position.clone(), time: state.clock.elapsedTime });
      
      // Remove old positions.
      while (history.length && (state.clock.elapsedTime - history[0].time > fadeDuration)) {
        history.shift();
      }
      
      // Only use history points older than the delay
      const effectiveHistory = history.filter(
        (pt) => state.clock.elapsedTime - pt.time >= delay
      );

      // Update positions and color arrays.
      const len = effectiveHistory.length;
      for (let i = 0; i < len; i++) {
        // Set vertex position.
        positions[i * 3]     = effectiveHistory[i].pos.x;
        positions[i * 3 + 1] = effectiveHistory[i].pos.y;
        positions[i * 3 + 2] = effectiveHistory[i].pos.z;
        
        // Compute fade factor (1 = newest, 0 = oldest).
        const age = state.clock.elapsedTime - effectiveHistory[i].time;
        const alpha = 1 - age / fadeDuration;
        
        // Here we set the color to white with varying alpha.
        colors[i * 4]     = 1.0; // R
        colors[i * 4 + 1] = 1.0; // G
        colors[i * 4 + 2] = 1.0; // B
        colors[i * 4 + 3] = alpha; // A
      }
      
      // Update the geometry.
      if (geometryRef.current) {
        geometryRef.current.setDrawRange(0, len);
        geometryRef.current.attributes.position.needsUpdate = true;
        geometryRef.current.attributes.color.needsUpdate = true;
      }
    }
  });

  return (
    <line>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={maxPoints}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={maxPoints}
          array={colors}
          itemSize={4}
        />
      </bufferGeometry>
      {/* A custom shader or material that supports per-vertex alpha is recommended */}
      <lineBasicMaterial vertexColors transparent depthTest={false} />
    </line>
  );
};

export default Trail;