import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  center: { lat: number; lng: number }; // Center of the map
  locations?: Array<{ lat: number; lng: number; title: string }>; // Clinic locations
  zoom?: number;
}

export default function Map({ center, locations = [], zoom = 15 }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyD5dLMydwzJ2YUtzZglIPYAwGFLsqHX7Bw',
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        // Initialize the map
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
        });

        // Red marker icon
        const redMarkerIcon = {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',  // Google red dot icon
          scaledSize: new google.maps.Size(32, 32),  // Customize size of the marker
        };

        // Add markers for each location
        locations.forEach((location) => {
          new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map,
            title: location.title, // Title for hover effect
            icon: redMarkerIcon,    // Set the red marker icon
          });
        });
      }
    });
  }, [center, locations, zoom]);

  return <div ref={mapRef} className="w-full h-[300px] rounded-lg" />;
}
