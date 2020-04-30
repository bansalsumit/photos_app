import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Gallery from './containers/Gallery/Gallery';

function App() {
  return (
    <div className={styles.App}>
      <Gallery />
    </div>
  );
}

export default App;
