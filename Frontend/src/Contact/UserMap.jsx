 import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "80%",
  height: "100%",
  margin: "8px",
};

const UserMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
        // Default to a fallback location
        setLocation({ lat: 28.6139, lng: 77.209 }); // Delhi
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDAGrRXpvGqsMEBH1Wz9zEVEnl4cUsYAw4">
      {location && (
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
          <Marker position={location} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default UserMap;
