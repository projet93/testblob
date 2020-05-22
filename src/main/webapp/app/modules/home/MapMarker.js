import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

export const MapContainer = () => {
  const [selected, setSelected] = useState({});

  const onSelect = item => {
    setSelected(item);
  }


  const locations = [
    {
      name: "Location 1",
      location: {
        lat: parseFloat(50.6741186),
        lng: parseFloat(3.1635339)
      },
    },
    {
      name: "Location 2",
      location: {
        lat: parseFloat(50.6841186),
        lng: parseFloat(3.1735339)
      },
    },
    {
      name: "Location 3",
      location: {
        lat: parseFloat(50.8841186),
        lng: parseFloat(3.2735339)
      },
    },
    {
      name: "Location 4",
      location: {
        lat: parseFloat(50.5841186),
        lng: parseFloat(3.0035339)
      },
    },
    {
      name: "Location 5",
      location: {
        lat: parseFloat(50.6841186),
        lng: parseFloat(3.0535339)
      },
    }
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
    window.console.log(currentPosition);
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
  
  return (
    <LoadScript
      googleMapsApiKey='AIzaSyDj-zgI5H5vSaR9NbLwk7BxCyPiCz3cCTs'>
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
