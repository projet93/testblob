import React, { Component } from "react";
import {
  GoogleMap,
  Circle,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.circle = React.createRef();
    this.handleMapIdle = this.handleMapIdle.bind(this);
    this.idleCalled = false;
  }

  handleMapIdle() {
    if (!this.idleCalled) {
      const bounds = this.circle.current.getBounds();
      this.map.current.fitBounds(bounds);
      this.idleCalled = true;
    }
  }

  render() {
    const GoogleMapInstance = withGoogleMap(props => (
      <GoogleMap
        ref={this.map}
        defaultCenter={{
          lat: parseFloat(this.props.lat),
          lng: parseFloat(this.props.lng)
        }}
        defaultZoom={this.props.zoom}
        onIdle={this.handleMapIdle}
      >
        <Marker
          position={{
            lat: parseFloat(this.props.lat),
            lng: parseFloat(this.props.lng)
          }}
        />
        <Circle
          ref={this.circle}
          center={{
            lat: parseFloat(this.props.lat),
            lng: parseFloat(this.props.lng)
          }}
          radius={parseFloat(this.props.accuracy)}
          options={{ fillColor: "red", strokeColor: "red" }}
        />
      </GoogleMap>
    ));
    return (
      <div>
        <GoogleMapInstance
          containerElement={<div style={{ height: "600px", width: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }
}

export default withScriptjs(Map);
