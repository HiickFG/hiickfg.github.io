export const sphericalToCartesian = (radius, theta, phi) => {
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return [x, y, z];
  };

export const cartesianToSpherical = (x, y, z) => {
    const radius = Math.sqrt(x * x + y * y + z * z);
    const phi = Math.acos(z / radius); // Polar angle
    const theta = Math.atan2(y, x);   // Azimuthal angle
    return { radius, theta, phi };
};