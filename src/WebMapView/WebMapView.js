import React from 'react';
import { loadModules } from 'esri-loader';
import './WebMapView.css';

class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
    .then(([ArcGISMap, MapView]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [26.096306,44.439663],
        zoom: 11
      });
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
      <div className="webmap" ref={this.mapRef} />
    );
  }
}

export default WebMapView;