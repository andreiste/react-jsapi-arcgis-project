import React from 'react';
import './App.css';
import AppNavbar from './AppNavbar/AppNavbar'
import WebMapView from './WebMapView/WebMapView'

function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <WebMapView/>
    </div>
  );
}

export default App;
