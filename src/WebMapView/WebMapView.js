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
    loadModules(['esri/Map', 'esri/layers/MapImageLayer','esri/views/MapView',"esri/widgets/Legend", "esri/widgets/ScaleBar","esri/widgets/TimeSlider","esri/widgets/Expand","esri/TimeExtent"], { css: true })
    .then(([ArcGISMap, MapImageLayer, MapView, Legend, Scalebar,TimeSlider,Expand,TimeExtent]) => {

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
        expandIconClass: "esri-icon-layers",
        expandTooltip: "Legendă",
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

      const date = new Date();
      const date_earlier = new Date();
      date_earlier.setDate(date.getDate()-1);

      const timeSlider = new TimeSlider({
        container: this.sliderRef.current,
        mode: "time-window",
        view: this.view,
        values: [
          date
        ],
        loop: true,
        timeVisible: true
      })

      this.view.ui.add(timeSlider,"manual");

      this.view.whenLayerView(trafficLayer).then(function(lv) {
        const fullTimeExtent = new TimeExtent({
          start: date_earlier,
          end: date

        })
        timeSlider.fullTimeExtent = fullTimeExtent;
        timeSlider.stops = {
          interval:{
            value: 15,
            unit: "minutes"
          }
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
      <div>
        <div className="webmap" ref={this.mapRef} />
        <div className="container" ref={this.sliderRef}/>
      </div>
    );
  }
}

export default WebMapView;