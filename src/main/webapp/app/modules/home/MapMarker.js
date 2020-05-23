import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

export const MapContainer = () => {
  const [selected, setSelected] = useState({});

  const onSelect = item => {
    setSelected(item);
  }


  const locations = [
   
    
  ];
  const mapStyles = {
    height: "75vh",
    width: "100%"
  };

  const [currentPosition, setCurrentPosition] = useState({});

  const success = position => {
    const currentPosition = {
      lat: Number(position.coords.latitude),
      lng: Number(position.coords.longitude)
    }    
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    window.console.log(currentPosition);
    navigator.geolocation.getCurrentPosition(success);
  })
  
  return (
    <LoadScript  googleMapsApiKey='AIzaSyDj-zgI5H5vSaR9NbLwk7BxCyPiCz3cCTs'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={11}
        center={currentPosition}>
        {
          currentPosition.lat &&
          (
            <Marker position={currentPosition} />
          )
        }
        {
          locations.map(item => {
            return (
              <Marker key={item.name}
                position={item.location}
                onClick={() => onSelect(item)}
              />
            )
          })
        }
        {
          selected.location &&
          (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
          )
        }
      </GoogleMap>
    </LoadScript>
  )
}
