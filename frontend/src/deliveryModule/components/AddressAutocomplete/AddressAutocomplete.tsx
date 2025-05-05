import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import {
  ChakraProvider,
  Box,
  Input,
  VStack,
  extendTheme,
} from '@chakra-ui/react';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;

const AddressAutocomplete = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <ChakraProvider theme={theme}>
      <APIProvider
        apiKey={API_KEY}
        solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
      >
        <Box height="100vh" width="100%" position="relative">
          <Map
            mapId="bf51a910020fa25a"
            defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling="greedy"
            disableDefaultUI={true}
            style={{ height: '100%', width: '100%' }}
          >
            <AdvancedMarker ref={markerRef} position={null} />
            <MapControl position={ControlPosition.TOP}>
              <Box
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="md"
                width={{ base: '90%', md: '400px' }}
                mx="auto"
                mt={4}
              >
                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
              </Box>
            </MapControl>
            <MapHandler place={selectedPlace} marker={marker} />
          </Map>
        </Box>
      </APIProvider>
    </ChakraProvider>
  );
};

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <VStack spacing={2} align="stretch">
      <Input
        ref={inputRef}
        placeholder="Search a location"
        size="md"
        borderColor="gray.300"
        _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182ce' }}
      />
    </VStack>
  );
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
      },
    },
  },
});

export default AddressAutocomplete;
