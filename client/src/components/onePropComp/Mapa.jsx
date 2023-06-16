import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

export const Mapa = () => {
  const ciudad = "Málaga"; // Nombre de la ciudad que deseas mostrar en el mapa
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [cityName, setCityName] = useState("");
   

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: ciudad }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setCenter({ lat: lat(), lng: lng() });
        setCityName(results[0].formatted_address);
      }
    });
  }, [ciudad]);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyALclHDccdGFmxwrfbmy3mSYYy7RrAc9Vs">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} title={cityName} />
      </GoogleMap>
    </LoadScript>
  );
};
