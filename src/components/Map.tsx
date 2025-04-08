import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Create a singleton loader instance
const loader = new Loader({
  apiKey: 'AIzaSyD5dLMydwzJ2YUtzZglIPYAwGFLsqHX7Bw',
  version: 'weekly',
  libraries: ['marker']
});

interface MapProps {
  center: { lat: number; lng: number }; // Center of the map
  locations?: Array<{ lat: number; lng: number; title: string }>; // Clinic locations
  zoom?: number;
}

export default function Map({ center, locations = [], zoom = 15 }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loader.load().then(() => {
      if (mapRef.current) {
        // Initialize the map
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapId: '890df32fce64f1345'
        });

        // Add markers for each location
        locations.forEach((location) => {
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: location.lat, lng: location.lng },
            map,
            title: location.title,
          });

          // Add a custom pin element
          const pinElement = document.createElement('div');
          pinElement.className = 'custom-pin';
          pinElement.style.backgroundColor = '#FF0000';
          pinElement.style.width = '16px';
          pinElement.style.height = '16px';
          pinElement.style.borderRadius = '50%';
          pinElement.style.border = '2px solid white';
          pinElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
          
          marker.content = pinElement;
        });
      }
    });
  }, [center, locations, zoom]);

  return <div ref={mapRef} className="w-full h-[300px] rounded-lg" />;
}
