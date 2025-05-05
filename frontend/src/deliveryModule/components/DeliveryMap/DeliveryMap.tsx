// DeliveryMap.tsx
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    useLoadScript,
  } from "@react-google-maps/api";
import { useState, useEffect } from "react";
  
  const DeliveryMap = ({ origin, destination }: { origin: string; destination: string }) => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "YOUR_API_KEY" });
    const [directions, setDirections] = useState(null);
  
    useEffect(() => {
      if (!origin || !destination) return;
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result: any, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    }, [origin, destination]);
  
    if (!isLoaded) return <div>Loading...</div>;
  
    return (
      <GoogleMap center={{ lat: -34, lng: 151 }} zoom={13} mapContainerStyle={{ height: "400px" }}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    );
  };
  