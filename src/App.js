import React from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from './containers/Gallery/Gallery';
import PhotoGrid from './containers/PhotoGrid/PhotoGrid';

function App() {
  return (
    <div>
      <Gallery>
        <PhotoGrid />
      </Gallery>
    </div>
  );
}

export default App;
