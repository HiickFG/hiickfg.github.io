import React from 'react';
import Globe from "./components/graphic-components/globe.jsx";
import MatrixCanvas from "./components/graphic-components/matrixCanvas.jsx";
import TopMenu from './components/general/topMenu.jsx';
import { sphericalToCartesian } from './utils/globeUtils.js';

function App() {
  const sphereRadius = 1;
  const sphericalSpots = [
    { theta: 0, phi: 0, color: 'white' },
    { theta: 0, phi: Math.PI / 4, color: 'white' },
    { theta: 0, phi: Math.PI / 2, color: 'white' },
    { theta: 0, phi: 3 * Math.PI / 4, color: 'white' },
    { theta: 0, phi: Math.PI, color: 'white' },
    { theta: 0, phi: 5 * Math.PI / 4, color: 'white' },
    { theta: 0, phi: 3 * Math.PI / 2, color: 'white' },
    { theta: 0, phi: 7 * Math.PI / 4, color: 'white' },
    
  ];

  const calculateSpotPositions = (spots, radius) => {
    return spots.map(({ theta, phi, color }) => {
      return { position: sphericalToCartesian(radius, theta, phi), color }; // Return Cartesian position and color
    });
  };

  const spotsPositions = calculateSpotPositions(sphericalSpots, sphereRadius);

  return (
    <div className="app">
      <header className="app-header">
        <TopMenu />
      </header>
      <div className='app-content'>
        <MatrixCanvas />
        <Globe spots={spotsPositions} />
      </div>
    </div>
  );
}

export default App;