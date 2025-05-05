import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from '@react-google-maps/api';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: -33.918861,
  lng: 18.4233,
};

const travelModes = ['DRIVING', 'WALKING', 'BICYCLING',  'TRANSIT'] as const;
type TravelMode = typeof travelModes[number];

const pricePerKm = {
  DRIVING: 5,
  WALKING: 0,
  BICYCLING: 2,
  TRANSIT: 10,
};

const MapWithDirections: React.FC = () => {
  const [origin, setOrigin] = useState('Cape Town');
  const [destination, setDestination] = useState('Stellenbosch');
  const [mode, setMode] = useState<TravelMode>('DRIVING');
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState<number | null>(null);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  });

  const setupAutocomplete = () => {
    if (originRef.current && destinationRef.current && window.google) {
      const originAuto = new window.google.maps.places.Autocomplete(originRef.current);
      const destinationAuto = new window.google.maps.places.Autocomplete(destinationRef.current);

      originAuto.addListener('place_changed', () => {
        const place = originAuto.getPlace();
        if (place.formatted_address) setOrigin(place.formatted_address);
      });

      destinationAuto.addListener('place_changed', () => {
        const place = destinationAuto.getPlace();
        if (place.formatted_address) setDestination(place.formatted_address);
      });
    }
  };

  const fetchDirections = useCallback(() => {
    if (!origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode[mode],
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          const leg = result.routes[0].legs[0];
          setDistance(leg.distance?.text || '');
          setDuration(leg.duration?.text || '');

          // Extract numeric distance and calculate cost
          const distanceInKm = parseFloat(leg.distance?.text.replace(/[^0-9.]/g, '') || '0');
          const cost = distanceInKm * (pricePerKm[mode] ?? 0);
          setCost(Number(cost.toFixed(2)));
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [origin, destination, mode]);

  useEffect(() => {
    if (isLoaded) {
      setupAutocomplete();
    }
  }, [isLoaded]);
  
  useEffect(() => {
    if (isLoaded && origin && destination) {
      fetchDirections();
    }
  }, [origin, destination, mode, isLoaded]);
  
  
  if (!isLoaded) return <Box p={4}>Loading map...</Box>;

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>Google Maps Directions with Autocomplete</Heading>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        mb={6}
        align="center"
        wrap="wrap"
      >
        <Input
          ref={originRef}
          placeholder="From"
          defaultValue={origin}
          variant="filled"
        />
        <Input
          ref={destinationRef}
          placeholder="To"
          defaultValue={destination}
          variant="filled"
        />
        <Select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as TravelMode);
          }}
          variant="filled"
        >
          {travelModes.map((m) => (
            <option key={m} value={m}>{m.toLowerCase()}</option>
          ))}
        </Select>
        <Button colorScheme="blue" onClick={fetchDirections}>
          Get Directions
        </Button>
      </Flex>

      <VStack align="start" mb={4}>
        <Text><strong>Distance:</strong> {distance}</Text>
        <Text><strong>Duration:</strong> {duration}</Text>
        {cost !== null && <Text><strong>Estimated Cost:</strong> ZAR {cost}</Text>}
      </VStack>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </Box>
  );
};

export default MapWithDirections;
