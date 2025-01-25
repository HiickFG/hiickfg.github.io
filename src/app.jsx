import React from 'react';
import Globe from "./components/graphic-components/globe.jsx";
import MatrixCanvas from "./components/graphic-components/matrixCanvas.jsx";
import TopMenu from './components/general/topMenu.jsx';
import { sphericalToCartesian } from './utils/globeUtils.js';

function App() {
  const sphereRadius = 1;
  const sphericalSpots = [
    { theta: 0, phi: 0, color: 'red', emissiveColor: 'red' },
    { theta: 0, phi: Math.PI / 4, color: 'red', emissiveColor: 'red' },
    { theta: 0, phi: Math.PI / 2, color: 'red', emissiveColor: 'red' },
    { theta: 0, phi: 3 * Math.PI / 4, color: 'red', emissiveColor: 'red' },
    { theta: 0, phi: Math.PI, color: 'red', emissiveColor: 'red' },
    { theta: 0, phi: 5 * Math.PI / 4, color: 'red', emissiveColor: 'red' },
    { theta: 0, phi: 3 * Math.PI / 2, color: 'red', emissiveColor: 'red' },
    { theta: 0, phi: 7 * Math.PI / 4, color: 'red', emissiveColor: 'red' },
    
  ];

  const calculateSpotPositions = (spots, radius) => {
    return spots.map(({ theta, phi, color, emissiveColor }) => {
      return { position: sphericalToCartesian(radius, theta, phi), color, emissiveColor }; // Return Cartesian position and color
    });
  };

  const handleHover = (e, setColor) => {
    e.stopPropagation();
    const originalColor = e.object.material.color;
    e.object.userData.initialColor = originalColor.clone(); // Save initial color
    e.object.material.color.set(setColor); // Change color on hover
  };
  
  const handleHoverOut = (e) => {
    e.stopPropagation();
    const initialColor = e.object.userData.initialColor || 'white';
    e.object.material.color.set(initialColor); // Reset color
  };

  const spotsConfigs = calculateSpotPositions(sphericalSpots, sphereRadius);

  return (
    <div className="app">
      <header className="app-header">
        <TopMenu />
      </header>
      <div className='app-content'>
        <MatrixCanvas />
        <Globe spots={spotsConfigs} color="darkred" hoverColor="red" hoverInFcn={handleHover} hoverOutFcn={handleHoverOut} />
      </div>
    </div>
  );
}

export default App;