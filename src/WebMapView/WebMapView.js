import React from 'react';
import { loadModules } from 'esri-loader';
import './WebMapView.css';


class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    loadModules(['esri/Map', 'esri/layers/MapImageLayer','esri/views/MapView',"esri/widgets/Legend", "esri/widgets/ScaleBar","esri/widgets/TimeSlider","esri/widgets/Expand"], { css: true })
    .then(([ArcGISMap, MapImageLayer, MapView, Legend, Scalebar,TimeSlider,Expand]) => {

      const trafficLayer = new MapImageLayer({
        url: "https://utility.arcgis.com/usrsvcs/appservices/HGUdCnGhABOZFpsG/rest/services/World/Traffic/MapServer",
        dpi: 48,
        imageFormat: "png32",
        refreshInterval: 3, 
        useViewTime: true,
        sublayers: [{
          id: 0,
          source: {
            type: "map-layer",
            mapLayerId: 18
          }
        },{
          id: 1,
          source: {
            type: "map-layer",
            mapLayerId: 19
          }
        },{
          id: 2,
          source: {
            type: "map-layer",
            mapLayerId: 20
          }
        },{
          id: 3,
          source: {
            type: "map-layer",
            mapLayerId: 23
          }
        }]
      });

      const map = new ArcGISMap({
        basemap: 'topo-vector',
        layers: [trafficLayer]
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [26.096306,44.439663],
        zoom: 11
      });

      const legend = new Legend({
        view: this.view,
        layerInfos: [
          {
            layer: trafficLayer,
            title: "Legendă",
          }
        ],
        style: "card"
      });

      const legendExpand = new Expand({
        expandIconClass: "esri-icon-collection",
        expandTooltip: "Legenda",
        view: this.view,
        content: legend,
        expanded: false
      });

      this.view.ui.add(legendExpand,"top-left");

      const scaleBar = new Scalebar({
        view: this.view,
        style: "line",
        unit: "metric"
      })

      this.view.ui.add(scaleBar,{
        position: "bottom-left",
      })

      const timeSlider = new TimeSlider({
        container: this.sliderRef.current,
        mode: "time-window",
        view: this.view,
        values: [
          new Date()
        ],
        loop: true,
        timeVisible: true
      })

      this.view.ui.add(timeSlider,"manual");

      this.view.whenLayerView(trafficLayer).then(function(lv) {
        const fullTimeExtent = trafficLayer.timeInfo.fullTimeExtent;

        timeSlider.fullTimeExtent = fullTimeExtent;
        timeSlider.stops = {
          interval: trafficLayer.timeInfo.interval
        };
      });

    });
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.container = null;
    }
  }

  render() {
    return (
      <body>
        <div className="webmap" ref={this.mapRef} />
        <div className="container" ref={this.sliderRef}/>
      </body>
    );
  }
}

export default WebMapView;