import React from 'react';
import AppNavbar from './AppNavbar/AppNavbar'
import WebMapView from './WebMapView/WebMapView'
import Description from './Description/Description'
import BottomPage from './BottomPage/BottomPage'

function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <WebMapView/>
      <Description/>
      <BottomPage/>
    </div>
  );
}

export default App;
